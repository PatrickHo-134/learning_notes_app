from django.db import models
from django.db import models
from django.contrib.auth.models import User, AbstractUser

# class User(AbstractUser):
#     id = models.AutoField(primary_key=True)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)
#     created_at = models.DateTimeField(auto_now_add=True)
#     last_login_at = models.DateTimeField(blank=True, null=True)

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"

class LearningNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title