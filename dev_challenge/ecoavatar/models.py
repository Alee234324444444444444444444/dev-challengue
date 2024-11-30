from django.db import models

class User(models.Model):
    name = models.CharField(max_length=75, null=False)
    user_name = models.CharField(max_length=75, null=False)
    email = models.EmailField(null=False, unique=True)

    def __str__(self):
        return self.user_name
