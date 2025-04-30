# event/tests/test_event_creation.py

from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from event.models import Event, Like
from rest_framework.authtoken.models import Token
from django.urls import reverse

class LikeEventTestCase(APITestCase):
    def setUp(self):
        # Create users
        self.user = User.objects.create_user(
            email='testuser@example.com',
            name="testuser",
            type="normal",
            tc=True,
            password='oldpassword123'
        )
        self.other_user = User.objects.create_user(email='testuser2@example.com',
            name="testuser",
            type="normal",
            tc=True,
            password='oldpassword123')

        # Create events
        self.event_by_other = Event.objects.create(
            event_id='EVT001',
            user=self.other_user,
            title='Test Event'
        )
        self.event_by_user = Event.objects.create(
            event_id='EVT002',
            user=self.user,
            title='Own Event'
        )

        self.like_url = reverse('like_event-list')  # 'like_event' is the router basename

        self.client.login(username='user1', password='pass123')

    def test_user_can_like_an_event(self):
        data = {
            "event": self.event_by_other.event_id
        }
        response = self.client.post(self.like_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Like.objects.count(), 1)

    def test_user_cannot_like_same_event_twice(self):
        Like.objects.create(user=self.user, event=self.event_by_other)
        data = {
            "event": self.event_by_other.event_id
        }
        response = self.client.post(self.like_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("msg", response.data)

    def test_user_cannot_like_their_own_event(self):
        data = {
            "event": self.event_by_user.event_id
        }
        response = self.client.post(self.like_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['msg'], "You cannot like your own event")

    def test_event_does_not_exist(self):
        data = {
            "event": "INVALID"
        }
        response = self.client.post(self.like_url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['msg'], "Event does not exist")
