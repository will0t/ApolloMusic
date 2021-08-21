from django.db import models

USER_TYPE = (
    (0, "Admin"),
    (1, "Promoter"),
    (2, "Performer"),
)

class User(models.Model):
    class Meta:
        app_label = 'User'
    id = models.IntegerField(primary_key=True,)
    name = models.CharField(max_length=40, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=30)
    phone = models.CharField(max_length=30)
    description = models.TextField()
    location = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=6, decimal_places=3)
    profession = models.CharField(max_length=30)
    userType = models.SmallIntegerField(choices=USER_TYPE)
    publicKey = models.CharField(max_length=50)
