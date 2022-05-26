from django.db import models
from django.utils.crypto import get_random_string


class Consumer(models.Model):
    phone = models.CharField(max_length=20, blank=True)
    username = models.CharField(max_length=20, blank=True)
    silver = models.PositiveSmallIntegerField(default=0)
    gold = models.PositiveSmallIntegerField(default=0)
    rank = models.PositiveIntegerField(default=5)
    rank_progres = models.PositiveSmallIntegerField(default=0)
    silver_required_for_rank = models.PositiveSmallIntegerField(default=10)
    silver_total = models.PositiveSmallIntegerField(default=0)
    silver_required_for_gold = models.PositiveSmallIntegerField(default=9)
    referral_code = models.CharField(
        max_length=6, unique=True, default='nimic')
    friend_refferal = models.CharField(max_length=6, blank=True)
    friends = models.PositiveIntegerField(default=0)
    gold_made_from_friends = models.PositiveIntegerField(default=0)
    adus_de = models.ForeignKey(
        'self', on_delete=models.SET_NULL, blank=True, null=True)
    bar_code = models.PositiveIntegerField(default=0)
    gived_one_gold = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # COMPLETARE CARD DE FIDELITATE
        if self.silver >= self.silver_required_for_gold:
            self.gold += 1
            self.silver -= self.silver_required_for_gold

        # RANK-UP
        if self.rank > 0 and self.rank_progres >= self.silver_required_for_rank:
            self.rank -= 1
            self.rank_progres -= self.silver_required_for_rank
            self.silver_required_for_rank += 10
            self.silver_required_for_gold -= 1

        # ADAUGA REFERRAL
        if self.adus_de == None:
            try:
                x = Consumer.objects.filter(
                    referral_code__iexact=self.friend_refferal)
                self.adus_de = x[0]
                z = x[0]
                z.friends += 1
                z.save()
            except:
                self.adus_de = None

        # GENERATOR REFERRAL_CODE
        if self.referral_code == 'nimic':
            code = get_random_string(
                length=6, allowed_chars='QWERTYUIOPASDFGHJKLZXCVBNM')
            while Consumer.objects.filter(referral_code=code):
                code = get_random_string(length=6)
            self.referral_code = code

        # GENERATOR BAR_CODE
        if self.bar_code == 0:
            self.bar_code = self.id + 137584

        # DACA AM FACUT PRIMUL GOLD, PRIMESTE SI PRIETENU NOSTRU UN GOLD
        if self.gold >= 1 and self.adus_de and self.gived_one_gold == False:
            self.gived_one_gold = True
            x = self.adus_de
            x.gold += 1
            x.gold_made_from_friends += 1
            x.save()

        super().save(*args, **kwargs)

    # https://www.barcodesinc.com/generator/image.php?code={CODE}&style=197&type=C128B&width=141&height=50&xres=1&font=3

    def __str__(self):
        return self.username + ': ' + str(self.id)
