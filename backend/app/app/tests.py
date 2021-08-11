from django.test import TestCase

from app.demo import demo


class DemoTests(TestCase):

    def test_demo(self):
        '''Testing (during Docker setup)'''
        # Setup
        # Expectations
        # Assertions
        self.assertEqual(demo(True), False)
        self.assertEqual(demo(False), True)
