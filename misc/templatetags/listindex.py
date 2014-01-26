from django import template

register = template.Library()

@register.filter(name='listindex')
def listindex(value, args):
    """
    Returns the value[args][1]
    """
    if args is None:
        return False
    return value[args][1]
