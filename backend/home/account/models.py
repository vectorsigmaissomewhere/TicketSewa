from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, type, tc, password=None):
        """
        Creates and saves a User with the given email, name, type, tc, and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            type=type,
            tc=tc,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, type, tc, password=None):
        """
        Creates and saves a superuser with the given email, name, type, tc, and password.
        """
        user = self.create_user(
            email=email,
            name=name,
            type=type,
            tc=tc,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True  
        user.save(using=self._db)
        return user
    
# Custom User Model
class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    public_email = models.EmailField(verbose_name="Public Email", max_length=255, unique=True, null=True, blank=True)
    bio = models.CharField(max_length=200, blank=True)
    social_account1 = models.CharField(max_length=200, blank=True)
    social_account2 = models.CharField(max_length=200, blank=True)
    social_account3 = models.CharField(max_length=200, blank=True)
    social_account4 = models.CharField(max_length=200, blank=True)
    name = models.CharField(max_length=200)
    
    USER_TYPE_CHOICES = (
        ("normal", "Normal User"),
        ("contributor", "Contributor"),
    )
    type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default="normal")

    tc = models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "type", "tc"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser  

    def has_module_perms(self, app_label):
        return self.is_superuser

    @property
    def is_staff(self):
        return self.is_admin  #
