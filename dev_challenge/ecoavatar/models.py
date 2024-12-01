from django.db import models

class User(models.Model):
    name = models.CharField(max_length=75, null=False)
    user_name = models.CharField(max_length=75, null=False)
    email = models.EmailField(null=False, unique=True)

    def __str__(self):
        return self.user_name
    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='media/')
    description = models.CharField(max_length=75, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Op >> {self.user.username} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
