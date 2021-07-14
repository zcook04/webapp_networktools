class Error(Exception):
    pass


class InvalidInputDetected(Error):
    pass


class AmbiguousCommand(Error):
    pass
