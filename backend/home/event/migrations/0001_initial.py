# Generated by Django 5.1.4 on 2025-01-14 13:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('event_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('event_type', models.CharField(choices=[('concert', 'Concert'), ('sport', 'Sport'), ('art', 'Art'), ('family', 'Family')], max_length=50)),
                ('event_image', models.ImageField(blank=True, null=True, upload_to='media/eventimage/')),
                ('country', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('ticket_active', models.BooleanField(default=True)),
                ('max_tickets', models.PositiveIntegerField(blank=True, null=True)),
                ('is_featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
