from django import forms

class NameForm(forms.Form):
    your_name = forms.IntegerField(label='code')