class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def msg(msg, type='WARNING'):
    print('----------------------------------------------------------------')
    if type == 'GREEN':
        print(f'{Colors.GREEN} {msg} {Colors.END}')
    elif type == 'HEADER':
        print(f'{Colors.HEADER} {msg} {Colors.END}')
    elif type == 'BLUE':
        print(f'{Colors.BLUE} {msg} {Colors.END}')
    elif type == 'CYAN':
        print(f'{Colors.CYAN} {msg} {Colors.END}')
    elif type == 'WARNING':
        print(f'{Colors.WARNING} {msg} {Colors.END}')
    elif type == 'FAIL':
        print(f'{Colors.FAIL} {msg} {Colors.END}')
    elif type == 'BOLD':
        print(f'{Colors.BOLD} {msg} {Colors.END}')
    elif type == 'UNDERLINE':
        print(f'{Colors.UNDERLINE} {msg} {Colors.END}')
    else:
        return
    print('----------------------------------------------------------------')
