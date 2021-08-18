from django.db import models

CONTRACT_TYPE = (
    (0, "Created"),
    (1, "Editing"),
    (2, "Ongoing"),
    (3, "Payed"),
)

class SmartContract(models.Model):
    class Meta:
        app_label = 'SmartContract'
    id = models.IntegerField(primary_key=True,)
    eventName = models.CharField(max_length=40, unique=True)
    startTime = models.DateTimeField()
    payoutTime = models.DateTimeField()
    Duration = models.JSONField()
    Address = models.CharField(max_length=200)
    Terms = models.TextField()
    Condition =  models.TextField()
    Fee = models.DecimalField(max_digits=20, decimal_places=5)
    Location = models.CharField(max_length=20)
    Receivers = models.ManyToManyField(to="User.User")
    Attachments = models.FilePathField()
    generatedCode = models.CharField(max_length=100)
    status = models.SmallIntegerField(choices=CONTRACT_TYPE)
    creator = models.ForeignKey(to="User.User", related_name='creator', on_delete=models.SET_NULL, null=True)
    updater = models.ForeignKey(to="User.User", related_name='updater', on_delete=models.SET_NULL, null=True)
    updateTime = models.DateTimeField()
    createTime = models.DateTimeField()
    version = models.IntegerField()
