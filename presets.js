// presets



const { combineRgb } = require('@companion-module/base')

// base64 pngs for arrows
const white_arrow_up = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg=='
const black_arrow_up = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAABJElEQVR4nO2ZuwKDMAwDQ///n9ulXfrANLGkDHdbGbB1hQDOGAAAAAAAXzjSDTy5v/3epa9xSzcwPuX8OhYhLehMxBaSkoKuCIhLSgn6J3hUUkLQTOCYJLeglaARSU5BHQHtklyCOoNZJTkEKQLZJKkFKYNYJCkFOQLIa6gEOdcJaS2FoMTjWFazW1DyrVdSu1NQ/LtpCHroErSDnBetvXQI2knOi7aeVgXNNvLPxHB2utgiKfE1PxM4JmlF0EzxlVlzZE7tvII6Ah5N57nMiiDHOuI6309Wr6ArjarCWGp33GJnTaj/aXntrjXoWzOu20BaO7mDefUpGN1lTW8cbg+CChBUgKACBBUgqABBBQgqQFABggoQVJAUlByVAAAAAACAlAcwPihB6aFyzgAAAABJRU5ErkJggg=='
const white_arrow_down = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC'
const black_arrow_down = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAABMklEQVR4nO2ZQQ7CMAwEDeL/Xy4nLijUbWLvBmnmCq3jUVvbSQQAAAAAwICHOf6R/O5eXzyNsTM5V//TilPQX4CgBAQlICgBQQkISkBQAoISEJSAoAQEJbyK7vM9MymHzNbYFU/QaKBUDZntsVcFnS2mW5Ik9oog53aFLLbiI10t6c79lmOrqtgRNaLkG2jqMr+S4My1yxVtRdBs8JlEbVuvFT2Dfd/4ByX9UMUrZj95GFC2pqpv0E6StuukP+wgqXwN1VXMKakldkeZd0hqi9nVBykltcbqbBQVktpjdHfSnQlInlLFqNGRiOwVVs1ilQlJi4ByWK1ITF4h1dP8SoKWHstxqjGTqK0BdR373EnYOsI4z8WuJG6f79wHh2cC7HIi/IIixiK2kAMAAAAAALO8Ad2JHFv/zoGhAAAAAElFTkSuQmCC'
const white_arrow_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC'
const black_arrow_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAABJElEQVR4nO3awQ6DIBCE4Wnf/53ttTEixuzu7MD8t/YEX1TACDjnnHPO7dmHPYBTx+k3fXxf9gD+OuOM/iutC9AdBBWpA9ATABoSG4h+C81iArXHAXhAEjgAB+gNDm25rwaSwgFqgeRwgDogSRygBkgWB8gHklmtRmUCvcVpc/UAeUBL4AA5QMvgAPGD6vTMCZlb5BXUCQcIGk8UUDecsCKAlsUB+O+D2megSQaaFAHUcv8SVdQVtCxS5C3WDSlkPBmTWuqokfGQfjvRlvuprFVsGaTMZX4JpOx9kDxSxUZRGqlqJy2LVHnUkESqPovJITEOqy03hKNYp3kZJObrDgkk9vugp0jbfP5y1Wzy23z+ctcIQeI2rO5Agw2ic84559zu/QCQQCNNtBAMigAAAABJRU5ErkJggg=='
const white_arrow_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg=='
const black_arrow_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAABH0lEQVR4nO3awQ6CMBQF0dH//2fdaMICAyFP7kDuJK4tJ60tCLTWWmut/bXX56PrkR4A6zCGcQHwDH//r1mjmU1JoC0EBVIKaO/Fx5HSS2xPUaQrAEEQ6SpAEEJKAR3dxk9HSs6gSyCll5geKQ0EciQDEIiRLEAgRTIBgRDJBgQypKnHCvF7pkWjj0omZpAJB4bHY1xiE40h3RUIhpDuDDRSgTYq0EZ3BhrZ7u8KNHYWmgDS/If1aXQ8tov7dnSLHr8e4xLT4IAPSIUDLiAdDriAjvT331AL0JHZc8oGYwDS4kAeSI0D7tdf1jr93GZ//WVZ5FCbXmJ7i534rwAUvR2yA8XvFc2vv8RxwPv6iwIH8ktsDUKD01prrbXW2s/eqisiT+l+3YkAAAAASUVORK5CYII='
const white_arrow_up_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABhlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X02G5AAAAgXRSTlMAAte32QZhZx7d+TywDTf8/d5VstYPOxULNvKmSY8TFBrxyeGCluJeELQ5uw7ULND4BedlKuv2P/vDA8UgCk30WO41s8+5X8dABAz6QhHVaR156JpPnihSfTJDNOMBm4bzSICqr23NsRjcGRbtjTCS2lzsOmyu9+WLKb2fTL8+RPDhqO4yAAABfElEQVRYw+3WZW/CUBQG4AO0FBsOwwcMm7sLc3d3d3e388/HGGs7lpD0tsm+9P3S5CT3SdPec+8BkCNHzv9FAVAAEABYdQDkA7jo9GNUIDMBzstb5vr0/Gx8Z35zOjI36R2xbu+619eWa2xCoK0FClF5h1cWxDHEwilEOyLlQc8hokoAlMRcESBh7siQlJBWKkijNaHuPrWBED9iYiDQ7Pv1D4Z4/DXyFo2JgeAghQEkEgAvT6IgNo/PIUmgd62oj80mqEIpINoXRkmg2j2UBDIWVXKLTSXEUIOF/xbV5aRQsJvvUOoqMqjZZ+c7FcX8ThYCtTbxHV0fkEGDA73D3Dpzi/6rWEYAdSn579PZ/t3IBJChkef0dLRlHXdkJ6TSmSnmiYPq1LQIiGHX9BvZYinJ7/+R6q1czUG0j9KSOTxDc6UhshZhMIQrS78mncwZtzErrNcYL6V2Zd0tJ6i7QFtAYPcvHv25W6J+/Y3BrRA/x6WGuGN5mpUjhyyfsGtrpKE95HoAAAAASUVORK5CYII='
const black_arrow_up_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAAClElEQVR4nO3a3YtNURzG8c8w5sJ4zUtMOXHhgrigkCiKlPIu5U6u5sa/oPwHLpRS4kK5I6EkXElyIcpbIxSTKC95C8NM42LtY/ZwzNl7Zp8Z+7S+teq3W/s8rfW0zl7rt9YiEolEIpFIJBKJRCLNwrhUPDMVz0jFLZiaep6VitvR9o+66SNuXQ5aC9abh26sxgLswmXcw25MwImkfhNO4Wvy3mucxk4sxXHB0D24jlvYIZh1DMuwFdsK7kNDOYSD6EJ/Uh7hWxK/xbNU3YNU/Fwwqfr8MBV34VMSf8KTVN2l0ehYUXwx0PDRLA0zqaVgvf6C9fJQdF8w+GMaqUE0qA7RoDpEg+pQtEHPCtZrOip4il5hRuvBS4PXOtX4A14obqpvCI2YGis4IoymM9iOhTib1O8XVsZXsRdbhBX4SGnINN8o5qTiSiqelpQqW3DNfzyCxpJFOImPokF/sVH4VhWZbjQNHULuVHQ+VnrasFnYtmhEwlp6FuO2xphTeoNW4SK+y97hXlzJ8X5pWWfwJlnW8gpLcrxfSjpwQX5zuoQF5YQcvykV44UPcnrbNGu5K+xZV2lKg+YL6URec3qw7w+tpjKoFeuFk4wfsneuDzewtobm/YwapWCFcIqRd+S8F45walHJqFEKzuGnfObcEbL6iUPoNo1BeUfOI6ypozk5o1YpyGPOG2Eqb6upNEBTGdQpW2duCqvrLEzJqFka6pn0VThvz8rUOnqlM4jaJvUJmfx29f9WaSbV0Cq9QQyYVN0x7MaGYeiMM/Tm2mfhxkgp6RSutFRzq/Zh6lRPS94JpvTgcRKfN/jeUelYjrkF6FRwFIeFFfcBYd21UjwA/U36ttrsMWtFJBKJRCKRSCQSiYyMX7bsHdzHC7b0AAAAAElFTkSuQmCC'
const white_arrow_down_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABXFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jYfXuAAAAc3RSTlMAQ98Ox1j9gAtRNTqBPfgu9p/MTQ+G1Qfx7Y0VBYyJgjkGd3ysU+Zz1IQvMM20PgwBp8Mi4TSUiDvlPxylsaF2WfcjJh0S+wLzQLmY4l/ovX3ra1rPLAOSKa4RUEvgcZwbFHqPzodGbX7qPMvCtsEq1laguT+HEwAAAVlJREFUWMPt1sduwkAQgOGxDfFCIITe0nvvvZHee++992TeX4pJQIC9hPWaQ6T41x6skfY7WGPJAGZm/6qgZjIH4AMgOp2Lq32batTkdW/trPt9+qC70DVmSKS2BXF7A1fX9DDnN2FUSpe8y5hID3SZuJMmrcwmoSFm5vD0BDWSNTnCUmZoD1PZtJCDGfIgRUpBMjPkR4rEAwUtFIkHAkKRuCCaxAdRJE5IK/FCGumWF1JLEW5ILfFD2ST9UBaJA6JLPBCQ57xAJcp5NQbtSgBReJSsH8QI5No8ODo+u397ecL3T35IGhcRA4jig8E9qmjAX2OGnAV5ggrxr0ELOaByVmg6B1TGvEYyTvxcKUaMv/ii7xN/VAZYY2dfSHkkPOYY7Kpf7OmLzLfGPIFGd6izWrRUjdYt9Xfo+ULsLpgRKqGtGyadAEIUmnuhXSAwMAXD5j+omZlZRl+X30CWTm2dHwAAAABJRU5ErkJggg=='
const black_arrow_down_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAACiElEQVR4nO3aP2xNURzA8Y8qIhVCdCIGQhiIQSMIhgoiMbQSYTIQm8GIpZ1EYjIazaINYiAGDCxIhJiomIQQRItI1XDe06Zp9d33zun743yTm3de7n2/9/t93829v3fuIZPJZDKZTCaTyTQmCyLFaZswXjJh3BEp/pS0pwyO5TiHy1iPgRpibcQq9OIOnqEHC3EBX2rKtE6cEhJ/gjGhoKJ04BAel2KM4Sk+lMbvcDdGsrPJCpzHR+NFlbeikg7i7RRxJm9NxVn/LqaIpGP4NUO8MeyOlHtSluI03pi5oEolHakg1hguRqohKZdUVkwRSZUK6o9Yx1/aZj6kENsLHn9NdRfuqUhyHYot6HYVn4kpKTqxBfXjURWfa1hJsQX9xB4tJCm2IBjWQpJSCKKFJKUSRItISimIOJI+Rc2oIKkFUbukfXHTaVw68FCxTrvI1pci6dk4g8rUcibVjdkURBNKmm1BNJmkeghiXNKDOn1/xdRD0LzS6zC6cb8OOVRMykn7ucKd62vpfacwj7xVmHA/gN+l128J86iJFII2YadwdlwRpkt7hHnlq8J0bCe24KUg6L9gMY5iyHhv8mLCeAjvNVkfFJNteC6dgKZvFNuxIWK8hiCmoNHI8RqClisoNjEFzY8YqxqS/Ngxg76KGKsaYq0iSUqfcEf5bvq7zciE8eikfT+mGU8+dmTSvqvoSlHQnAQx+7AW+3FTeAx9Aq8xiL3CUpgbwlOQk7gn/OU4LCxnGRAWQPTiltBPHRdWcgwKDyi7cB2fcUaiB4ep6BI6algmdNXla9QurC6N1whdd5luocuGzUK3DYtK+8qLpXZgXWm8MmLemUwmk8lkMplMJpPJZJqeP1EiEt/DzynyAAAAAElFTkSuQmCC'
const white_arrow_up_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABLFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PVkEkAAAAY3RSTlMAAQ/6Uc0OEAvHTzL7TcudsMHvdwnfUwMcG8UGiIfTrIkg9QI+/ZTDe460km73LNovCo1vQUuR4Lwk45/OK+3UERTkekziZlSK8QQnoOsFaaXmLqOylvPZLYDRZTUWUpiTDfAuEmiSAAABUklEQVRYw+3WZ2+DMBAG4EtTygrQ7NHsJt1777333vv+/38o6gIMSo0dqf3AK1lIZ/mRjPEJgCBBgvxtQr8WqDKbCiWUG1AnYXU7C7UJqKQSR5oKQwqIPphsYW24nEPjJCYXilf9F+G+qeTmThTP5w8X8gK9NLqOGMGPhD8fdXtBkGihlmlsmF5aqK2xg9FmQe3/DupuEhTpoT41z/V1HVHfxWRRo/6ORBfyjILx9mRo+2MDlS3ggF5q4uP9qzmVNjfOA+EDdDLcWA8IW6FJEJPkCbFI3hCDZEFVPsmC7mQuyYJ0iUuyIAG4JDvEJTkgHskJcUgExC6RECmxQ4REDa24ILsU6wL/rfYHskmX9C87Pfi9aA5cUmnRx/kffDmncSCkat7X342KSzOIuesNR1WSl7GU8Xfbbs9Gyoo0TvRp6Tie8d2TOsyx51UMEiQIS94B13oTqqYgGGoAAAAASUVORK5CYII='
const black_arrow_up_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAACYElEQVR4nO3az4tNYRzH8ReDMDFPkQ3FQln4VYRISihh/N5aUkoslZUlCzYiGz8Wlv4AyVbUZCEWrKgpO2ExFKaxOI/mdmPm3rnPM3fm3Oddp/uce8/5nufz7pznPPfeQ6FQKBQKhUKhUCgU6sqcGVKjbeZmrr8Wp2J7EY5hY1zfgsOxvRynsTKu78He2F4TayzEfAzGfWFDrAkhdedhXo6iqqAXcAbfsR27sQv3VWEP4V18/4hKxIP4ehBPcRxH0YcdcdmDR/gd9xvGThzAPnzNlCkZi3EFY3H51dBuXn5O8NnoFGq8Qn/+iJ0xgI/+Hyj3cjNlmBxj0BhWZ6jbKltTFss9SHeDLymL1VFQUuooaFnKYnUT9BtPut2JyRiQ5+40iqGG9SF8i+0PeKOaRM54gjRC7hqf29xTTQBPxvYg1uEGLqoml+eyJ0tEkEbQLdWsOWAFzmJJ07H6GtpLM2TJQpDustoWa9ZqrAzSjj0nprX300CQfoCulaQgz12sNpKCPIJqIyloLexIi9vVTlLQWtDXeNHitrWSFLQWckj141bPSQpaC/gqbt9zkoL2BNFjkoL2BdFDkoKpCaJHJAVTF0QPSAo6E0RnkpIyU78lj2A/Xna7IzkEpfoPvV1JX3E70bGzMqDzS6yRVi+3O8kSZKYPP0weaLiNmpNJeoz1abo/PTw0sZxPuNxmzX9JGsE1XXo0phO2qAJ8xjPjgZ7jveqpjKnwV9Jb42fOqk472y2uYhM247rqOZ5+XNLZzaEf51Vn4KyV08iCpvUUzyQ11ywUCoVCoVAoFAqF2cQf5M0boOUApqYAAAAASUVORK5CYII='
const white_arrow_down_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABg1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aT76cAAAAgHRSTlMAafwJfflezc+3WA7Z5Rk6PAvpBNE73kJT89QxZ48czNIv9A1DnI3qKQUaymjT4a7HdVuGf85LR20CVHr+tLBlA0GvYSTYZEnbAcazNPX4yB4GrAgnmL6Bcj4qIVKIe8kdVadIEe27B90bOG/3Er1rYJq1wibyh+4Q5CMzRllMXDo5euMAAAGfSURBVFjD7dblUwJBGAbw5aSlBJRGQERBkLC7u7u7u7veP90jDnaEcdhjP+k9X5h9Zu43O7PLe4eQECH/KGsIaUooOEcLK75LpehH628idSrE+nMANfyQ3MY2BRm0C6mM462tUwJAJtVyUB1WmsoSFZEk46D6TBcYS3UKPpCYawxD5VxHImVD/RHIxMQbGintkGQcppkcOkuutQPYfkDfmjck556ZTSydve2YY5UWk0Mww672VPh+XFqCU8tA+whtL+KOpa+bF3Rh8B4ymDNaSnSzG9IPIpsL34/HTPZfS58auMPYuYNMWcQXOsD3U9ZDOkZkkCvqwSIqUI2WfEDmgiQxRANiIp8GKtDLO6/Znw19oOdXhKoROtEUBr1F5Y9f4dt1XygqKgh6YqcHwMQkQBWICr1H6czTgrpoQde0IGnekJEWNEwLMv/GPDDB/M/fDioVeLYA5GqoYt+xNRY4toJkCiBUG7vTEVxJu2Z549RbqXQuba7uVDZWO66mgw6d7kYaEPvvCb+REIp/srGzLP4aa0n8zKFkKUSIkD+Qb9QrYMvxAbaBAAAAAElFTkSuQmCC'
const black_arrow_down_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAYAAAATBx+NAAAC7klEQVR4nO3aTYiVVRzH8Y+mWcpIuRAqg6KFiAvpZWOKUIFO0io3liCIabRsEURQy3aCO3Phxo0gqWGLgtRFRL7kC021mEghSGIGdaFGjVrT4tzhHi/cuefxPue+6PnCn+dcnvP/c/6/eea8UygUCoVCoVAoFAaLZ6PyE1jUr4YMIgvwGdZhF45jM97rMu58bOgyRt8ZwceYwN+YbtjlxrMbkVbhR3yEr7prZv84oClKO3vpHuI+jy8wFcUZSpF+11mgTyvGfBWX2sTKKtLcDDGvJNSZqhDvSbzv7k4/ZlRGkXIIlMJ/CXXm4XUcxRsd6mYTqV8CpfAMPsGLifVHhX/FWhlEgeZgDXbjhQp+/2Jl3Y2ZV3fARK7P8m419mF5xZhX8ec9t6iHXNB5FPu8je8yHBH6qE4xYvsZW7E4R0J1kyLQNB5u8RvFeKJvbGN4OWdCdZMq0OORz9M4kegX2w1sw0OZc6qVVIGWCH3ga/gGdxL9Zux7oTMfOs5LS5CwfBhLrB/bTWzqSTYZOCctyVU47O61VYqdE3YGHu1VQnWTKtDVxHqxXcIrvUslD6kCVbXLeMcQfzkz5BDojCEbymejboGmsKWnGWSmLoHu4KSwku/XkigLdQn0B9b3uO09oS6B3mrEewzPRfFXROWnhBOTbAzyp/srPsDb+Bq/4E3hxGSfMItej/3CxHFPf5pZnbq+oGtReSIq/4V/ot+TjWe3R0o9I9c8KMWq7iF1ZBB3FLthXd0B7zeBbtcd8H4TKOW0pBI5BBrkkbEyOQRamCFm38gh0IcZYnbihnDsMzR/nHeFYXdccyP+Jk5rDskXNG98TOJs9O6MkPQ0LgqnFjML11NRvZ+EuwBb8C3W1p1Irv5ib+N5VFgyLBVuZixq/D6G77ADt4SjnpXC3Z8jwsbYTvyGL7FRmOMcasTd2vA/hu04iB+E2ffQMRKVW2+ZxZtfrWdac9u8e6SlXrm5VigUCoVCoVAoFAqFB4v/Ad4UzQxQNhH3AAAAAElFTkSuQmCC'



let instLabel = 'm-cam'



function cvar(name) {
    return `$(${instLabel}:${name})`
}


function getPresets(inst) {
    instLabel = (inst.label == undefined) ? instLabel : inst.label

    let presets = [
        // audio
        {
            category: 'Audio',
            name: 'Audio Volume Control',
            type: 'button',
            style: {
                text: 'Volume:\n' + cvar('audio_volume'),
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,0,255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_input',
                            options: {input: 'toggle'}
                        }
                    ],
                    rotate_left: [
                        {
                            actionId: 'audio_volume',
                            options: {mode: 'dec', volume: 1}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'audio_volume',
                            options: {mode: 'inc', volume: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_input',
                    options: {invert: true},
                    style: {
                        text: "Audio:\nOFF",
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                }
            ]
        },
        {
            category: 'Audio',
            name: 'Decrease Audio Volume',
            type: 'button',
            style: {
                text: 'Volume:\n-1',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_volume',
                            options: {mode: 'dec', volume: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_input',
                    options: {invert: true},
                    style: {
                        text: "Volume:\nOFF",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Audio',
            name: 'Increase Audio Volume',
            type: 'button',
            style: {
                text: 'Volume:\n+1',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_volume',
                            options: {mode: 'inc', volume: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_input',
                    options: {invert: true},
                    style: {
                        text: "Volume:\nOFF",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
            ]
        },
        {
            category: 'Audio',
            name: 'Audio Delay Control',
            type: 'button',
            style: {
                text: 'Delay:\n' + cvar('audio_delay_time') + ' ms',
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,0,255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_delay',
                            options: {delay: 'toggle'}
                        }
                    ],
                    rotate_left: [
                        {
                            actionId: 'audio_delay_time',
                            options: {mode: 'dec', time: 1}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'audio_delay_time',
                            options: {mode: 'inc', time: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_delay',
                    options: {invert: true},
                    style: {
                        text: "Delay:\nOFF",
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                },
                {
                    feedbackId: 'audio_input',
                    options: {invert: true},
                    style: {
                        text: "Delay:\n...",
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                }
            ]
        },
        {
            category: 'Audio',
            name: 'Decrease Audio Delay',
            type: 'button',
            style: {
                text: 'Delay:\n-1 ms',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_delay_time',
                            options: {mode: 'dec', time: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_delay',
                    options: {invert: true},
                    style: {
                        text: "Delay:\nOFF",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
                {
                    feedbackId: 'audio_input',
                    options: {invert: true},
                    style: {
                        text: "Delay:\n...",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Audio',
            name: 'Increase Audio Delay',
            type: 'button',
            style: {
                text: 'Delay:\n+1 ms',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_delay_time',
                            options: {mode: 'inc', time: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_delay',
                    options: {invert: true},
                    style: {
                        text: "Delay:\nOFF",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
                {
                    feedbackId: 'audio_input',
                    options: {invert: true},
                    style: {
                        text: "Delay:\n...",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Audio',
            name: 'Change Input Level',
            type: 'button',
            style: {
                text: 'Audio\nIn: ' + cvar('audio_level'),
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'audio_level',
                            options: {level: 'toggle'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'audio_in',
                    options: {invert: true},
                    style: {
                        text: "Audio:\nOFF",
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },

        // camera
        {
            category: 'Camera',
            name: 'Change Image orientation',
            type: 'button',
            style: {
                text: 'Image:\n' + cvar('camera_image_orientation'),
                size: '14',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'camera_image_orientation',
                            options: {orientation: 'cycle', pan: true, tilt: true}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
    ]

    for (res of ['2160p_5994', '2160p_50', '2160p_2997', '2160p_25', '1080p_5994', '1080p_50', '1080p_2997', '1080p_25', '720p_5994', '720p_50', '720p_2997', '720p_25']) {
        let resolution = res.replace('_', '/')
        if (res[res.length-3] !== '_') {
            resolution = res.slice(0, -2).replace('_', '/') + '.' + res.slice(-2)
        }
        presets.push({
            category: 'Camera',
            name: 'Set Video Norm',
            type: 'button',
            style: {
                text: resolution.replace('/', '\n'),
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(51,0,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'camera_video_norm',
                            options: {norm: res}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'camera_video_norm',
                    options: {norm: res, invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        })
    }

    // exposure
    presets.push(
        {
            category: 'Exposure',
            name: 'Gain Control',
            type: 'button',
            style: {
                text: 'Gain:\n' + cvar('exposure_gain'),
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,0,255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'manual'}
                        }
                    ],
                    rotate_left: [
                        {
                            actionId: 'exposure_gain',
                            options: {gain: 'dec', force: true}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'exposure_gain',
                            options: {gain: 'inc', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Gain:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Decrease Gain',
            type: 'button',
            style: {
                text: 'Gain:\n-3 dB',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_gain',
                            options: {gain: 'dec', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Gain:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Increase Gain',
            type: 'button',
            style: {
                text: 'Gain:\n+3 dB',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_gain',
                            options: {gain: 'inc', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Gain:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Iris Control',
            type: 'button',
            style: {
                text: 'Iris:\n' + cvar('exposure_iris'),
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,0,255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'manual'}
                        }
                    ],
                    rotate_left: [
                        {
                            actionId: 'exposure_iris',
                            options: {iris: 'inc', force: false}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'exposure_iris',
                            options: {iris: 'dec', force: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Iris:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                },
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'iris', invert: false},
                    style: {
                        text: 'Iris:\n' + cvar('exposure_iris'),
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Decrease Iris',
            type: 'button',
            style: {
                text: 'Iris:\nclose',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_iris',
                            options: {iris: 'dec', force: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Iris:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'iris', invert: false},
                    style: {
                        text: 'Iris:\nclose',
                        color: combineRgb(0, 0, 0),
                        bgcolor: combineRgb(255, 255, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Increase Iris',
            type: 'button',
            style: {
                text: 'Iris:\nopen',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_iris',
                            options: {iris: 'inc', force: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Iris:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'iris', invert: false},
                    style: {
                        text: 'Iris:\nopen',
                        color: combineRgb(0, 0, 0),
                        bgcolor: combineRgb(255, 255, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Shutter Control',
            type: 'button',
            style: {
                text: 'Shutter:\n' + cvar('exposure_shutter_speed'),
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,0,255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'manual'}
                        }
                    ],
                    rotate_left: [
                        {
                            actionId: 'exposure_shutter_speed',
                            options: {shutter: 'inc', force: false}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'exposure_shutter_speed',
                            options: {shutter: 'dec', force: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Shutter:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                },
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'shutter', invert: false},
                    style: {
                        text: 'Shutter:\n' + cvar('exposure_shutter_speed'),
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Decrease Shutter',
            type: 'button',
            style: {
                text: 'Shutter:\nshorter',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_shutter_speed',
                            options: {shutter: 'dec', force: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Shutter:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'shutter', invert: false},
                    style: {
                        text: 'Shutter:\nshorter',
                        color: combineRgb(0, 0, 0),
                        bgcolor: combineRgb(255, 255, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Increase Shutter',
            type: 'button',
            style: {
                text: 'Shutter:\nlonger',
                size: '18',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_shutter_speed',
                            options: {shutter: 'inc', force: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Shutter:\n' + cvar('exposure_mode'),
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                },
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'shutter', invert: false},
                    style: {
                        text: 'Shutter:\nlonger',
                        color: combineRgb(0, 0, 0),
                        bgcolor: combineRgb(255, 255, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Auto Exposure Control',
            type: 'button',
            style: {
                text: 'Auto-Exp:\n' + cvar('exposure_compensation'),
                size: '14',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,0,255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'exposure_compensation',
                            options: {comp: 'dec'}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'exposure_compensation',
                            options: {comp: 'inc'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        text: 'Auto-Exp:\nOFF',
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Decrease Compensation',
            type: 'button',
            style: {
                text: 'Auto-Exp:\ndarker',
                size: '14',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_compensation',
                            options: {comp: 'dec'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        text: 'Auto-Exp:\nOff',
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Increase Compensation',
            type: 'button',
            style: {
                text: 'Auto-Exp:\nbrighter',
                size: '14',
                color: combineRgb(0,0,0),
                bgcolor: combineRgb(255,255,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_compensation',
                            options: {comp: 'inc'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        text: 'Auto-Exp:\nOFF',
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Full Auto',
            type: 'button',
            style: {
                text: 'SET\nAuto\nExp.',
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(51,0,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'auto'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'auto', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Shutter Priority',
            type: 'button',
            style: {
                text: 'SET\nShutter\nPrio',
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(51,0,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'shutter'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'shutter', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Iris Priority',
            type: 'button',
            style: {
                text: 'SET\nIris\nPrio',
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(51,0,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'iris'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'iris', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Exposure',
            name: 'Manual',
            type: 'button',
            style: {
                text: 'SET\nManual\nExp.',
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(51,0,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'exposure_mode',
                            options: {mode: 'manual'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'exposure_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },

        // focus
        {
            category: 'Focus',
            name: 'Change Focus Further Back',
            type: 'button',
            style: {
                text: '/\\\nFocus',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'focus_manual_adjust',
                            options: {direction: 'far', speed: 1}
                        }
                    ],
                    up: [
                        {
                            actionId: 'focus_manual_adjust',
                            options: {direction: 'stop', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'focus_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: '--\nFocus',
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Focus',
            name: 'Change Focus Closer',
            type: 'button',
            style: {
                text: 'Focus\n\\/',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'focus_manual_adjust',
                            options: {direction: 'near', speed: 1}
                        }
                    ],
                    up: [
                        {
                            actionId: 'focus_manual_adjust',
                            options: {direction: 'stop', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'focus_mode',
                    options: {mode: 'manual', invert: true},
                    style: {
                        text: 'Focus\n--',
                        color: combineRgb(255, 255, 0),
                        bgcolor: combineRgb(0, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Focus',
            name: 'Toggle Focus Mode (No Face Priority!)',
            type: 'button',
            style: {
                text: 'Focus:\n' + cvar('focus_mode'),
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'focus_mode',
                            options: {mode: 'toggle', face: false}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'focus_face_prio',
                    options: {invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(51, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Focus',
            name: 'Toggle Focus Mode (With Face Priority!)',
            type: 'button',
            style: {
                text: 'Focus:\n' + cvar('focus_mode'),
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'focus_mode',
                            options: {mode: 'toggle', face: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'focus_face_prio',
                    options: {invert: true},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(51, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Focus',
            name: 'One Push Auto Focus Trigger',
            type: 'button',
            style: {
                text: 'One Push\nAF',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'focus_one_push_trigger',
                            options: {force: true}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Focus',
            name: 'Change PTZ Assist',
            type: 'button',
            style: {
                text: 'PTZ\nAssist',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'focus_ptz_assist',
                            options: {mode: 'toggle', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'focus_ptz_assist',
                    options: {invert: true},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 51)
                    }
                }
            ]
        },

        // image

        // ndi
        {
            category: 'NDI',
            name: 'Change NDI',
            type: 'button',
            style: {
                text: 'NDI',
                size: '24',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'ndi_active',
                            options: {ndi: 'toggle'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'ndi_active',
                    options: {invert: true},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(51, 0, 0)
                    }
                }
            ]
        },

        // pan/tilt
        {
            category: 'Pan/Tilt',
            name: 'Speed Compensation ON/OFF',
            type: 'button',
            style: {
                text: 'Speed\nComp.',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_speed_comp',
                            options: {mode: 'toggle'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'pt_speed_comp',
                    options: {invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Pan/Tilt',
            name: 'Change Motion Speed',
            type: 'button',
            style: {
                text: 'Speed:\n' + cvar('pt_motion_speed'),
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'dec', speed: 1}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'inc', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Decrease Motion Speed',
            type: 'button',
            style: {
                text: 'Speed:\n-1',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'dec', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Increase Motion Speed',
            type: 'button',
            style: {
                text: 'Speed:\n+1',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'inc', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Slow Motion Speed',
            type: 'button',
            style: {
                text: 'Slow',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'set', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'pt_motion_speed',
                    options: {speed: 1, invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Pan/Tilt',
            name: 'Slow Motion Speed',
            type: 'button',
            style: {
                text: 'Mid',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'set', speed: 12}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'pt_motion_speed',
                    options: {speed: 12, invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Pan/Tilt',
            name: 'Slow Motion Speed',
            type: 'button',
            style: {
                text: 'Fast',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_motion_speed',
                            options: {mode: 'set', speed: 24}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'pt_motion_speed',
                    options: {speed: 24, invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Up',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_up,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'up', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Up-Right',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_up_right,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'up-right', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Right',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_right,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'right', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Down-Right',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_down_right,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'down-right', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Down',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_down,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'down', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Down-Left',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_down_left,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'down-left', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Left',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_left,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'left', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },
        {
            category: 'Pan/Tilt',
            name: 'Move Camera Up-Left',
            type: 'button',
            style: {
                text: '',
                size: '18',
                png64: black_arrow_up_left,
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'up-left', speed: 0}
                        }
                    ],
                    up: [
                        {
                            actionId: 'pt_move',
                            options: {direction: 'stop', speed: 1}
                        }
                    ],
                }
            ],
            feedbacks: []
        },

        // presets
        {
            category: 'Presets',
            name: 'PTZ Motion Sync ON/OFF',
            type: 'button',
            style: {
                text: 'Motion\nSync',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'presets_ptz_motion_sync',
                            options: {mode: 'toggle'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presets_ptz_motion_sync',
                    options: {invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Presets',
            name: 'Hold To Set Preset',
            type: 'button',
            style: {
                text: 'SET',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(0, 255, 0)
            },
            steps: [
                {
                    500: {
                        options: {runWhileHeld: true},
                        actions: [
                            {   
                                actionId: 'presets_select_action',
                                options: {mode: 'PresetSet'}
                            }
                        ]
                    },
                    501: {
                        options: {runWhileHeld: false},
                        actions: [
                            {
                                actionId: 'presets_select_action',
                                options: {mode: 'PresetCall'}
                            }
                        ]
                    }
                }
            ],
            feedbacks: []
        },
        {
            category: 'Presets',
            name: 'Hold To Clear Preset',
            type: 'button',
            style: {
                text: 'CLEAR',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 128, 0)
            },
            steps: [
                {
                    500: {
                        options: {runWhileHeld: true},
                        actions: [
                            {   
                                actionId: 'presets_select_action',
                                options: {mode: 'PresetClear'}
                            }
                        ]
                    },
                    501: {
                        options: {runWhileHeld: false},
                        actions: [
                            {
                                actionId: 'presets_select_action',
                                options: {mode: 'PresetCall'}
                            }
                        ]
                    }
                }
            ],
            feedbacks: []
        },
        {
            category: 'Presets',
            name: 'Call Home Position',
            type: 'button',
            style: {
                text: 'Home',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'presets_home_pos',
                            options: {}
                        }
                    ]
                }
            ],
            feedbacks: []
        }
    )
    
    for (let i = 1; i <= 32; i++) {
        presets.push({
            category: 'Presets',
            name: 'Execute Selected Action On Preset ' + i,
            type: 'button',
            style: {
                text: 'Preset ' + i,
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'presets_actions',
                            options: {mode: 'selected', value: i}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presets_select_action',
                    options: {mode: 'PresetSet'},
                    style: {
                        color: combineRgb(0, 0, 0),
                        bgcolor: combineRgb(0, 255, 0)
                    }
                },
                {
                    feedbackId: 'presets_select_action',
                    options: {mode: 'PresetClear'},
                    style: {
                        color: combineRgb(0, 0, 0),
                        bgcolor: combineRgb(255, 128, 0)
                    }
                }
            ]
        })
    }

    presets.push(
        {
            category: 'Presets',
            name: 'Set Fast Preset Call Speed',
            type: 'button',
            style: {
                text: 'Fast',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'presets_execution_speed',
                            options: {speed: 7}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presets_execution_speed',
                    options: {speed: 7, invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Presets',
            name: 'Set Slow Preset Call Speed',
            type: 'button',
            style: {
                text: 'Slow',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'presets_execution_speed',
                            options: {speed: 0}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presets_execution_speed',
                    options: {speed: 0, invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'Presets',
            name: 'Toggle AF On Preset Call',
            type: 'button',
            style: {
                text: 'Preset\nAF',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'presets_preload_af',
                            options: {mode: 'toggle'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presets_preload_af',
                    options: {invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },

        // streams
        {
            category: 'Streams',
            name: 'Toggle RTMP',
            type: 'button',
            style: {
                text: 'RTMP',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'streams_live',
                            options: {protocol: 'rtmp,RtmpEnable', mode: 'toggle', source: 'stream2'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'streams_live',
                    options: {protocol: 'rtmp,RtmpEnable', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Streams',
            name: 'Toggle SRT (Stream 1 - HEVC)',
            type: 'button',
            style: {
                text: 'SRT\nStream1\n(HEVC)',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'streams_live',
                            options: {protocol: 'srt,SRTEnable', mode: 'toggle', source: 'stream1'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'streams_live',
                    options: {protocol: 'srt,SRTEnable', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Streams',
            name: 'Toggle SRT (Stream 2 - H.264)',
            type: 'button',
            style: {
                text: 'SRT\nStream2\n(H.264)',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'streams_live',
                            options: {protocol: 'srt,SRTEnable', mode: 'toggle', source: 'stream2'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'streams_live',
                    options: {protocol: 'srt,SRTEnable', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'Streams',
            name: 'Toggle MPEG-TS',
            type: 'button',
            style: {
                text: 'MPEG-TS',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'streams_live',
                            options: {protocol: 'mpeg2ts,MPEG2TSEnable', mode: 'toggle', source: 'stream2'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'streams_live',
                    options: {protocol: 'mpeg2ts,MPEG2TSEnable', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },

        // tally
        {
            category: 'Tally',
            name: 'Toggle Tally Lamp',
            type: 'button',
            style: {
                text: 'Tally',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'tally_control',
                            options: {mode: 'toggle'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'tally_control',
                    options: {invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },

        // white balance
        {
            category: 'White Balance',
            name: 'Change Red Gain',
            type: 'button',
            style: {
                text: 'Red:\n' + cvar('wb_gain_red'),
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCrGain', mode: 'dec', gain: 1}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCrGain', mode: 'inc', gain: 1}
                        }
                    ],
                    down: [
                        {
                            actionId: 'whitebalance_select_mode',
                            options: {mode: 'manual,'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Decrease Red Gain',
            type: 'button',
            style: {
                text: 'Red\n-',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCrGain', mode: 'dec', gain: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Increase Red Gain',
            type: 'button',
            style: {
                text: '+\nRed',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(51, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCrGain', mode: 'inc', gain: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(255, 0, 0)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Change Blue Gain',
            type: 'button',
            style: {
                text: 'Blue:\n' + cvar('wb_gain_blue'),
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCbGain', mode: 'dec', gain: 1}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCbGain', mode: 'inc', gain: 1}
                        }
                    ],
                    down: [
                        {
                            actionId: 'whitebalance_select_mode',
                            options: {mode: 'manual,'}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Decrease Blue Gain',
            type: 'button',
            style: {
                text: 'Blue\n-',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCbGain', mode: 'dec', gain: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Increase Blue Gain',
            type: 'button',
            style: {
                text: '+\nBlue',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_red_blue_gain',
                            options: {channel: 'WhiteBalanceCbGain', mode: 'inc', gain: 1}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_mode',
                    options: {mode: 'manual', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Set Bright Sunlight Preset',
            type: 'button',
            style: {
                text: 'Sun-\nlight',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_select_preset',
                            options: {preset: '42,54', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_preset',
                    options: {preset: '42,54', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Set Incandescent Bulbs Preset',
            type: 'button',
            style: {
                text: 'Incand.\nBulbs',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_select_preset',
                            options: {preset: '36,68', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_preset',
                    options: {preset: '36,68', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Set Fluorescent Bulbs Preset',
            type: 'button',
            style: {
                text: 'Flour.\nBulbs',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_select_preset',
                            options: {preset: '40,63', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_preset',
                    options: {preset: '40,63', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Set Mixed Light Preset',
            type: 'button',
            style: {
                text: 'Mixed\nLight',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_select_preset',
                            options: {preset: '42,59', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_preset',
                    options: {preset: '42,59', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },
        {
            category: 'White Balance',
            name: 'Set Cloudy Preset',
            type: 'button',
            style: {
                text: 'Cloudy',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 51)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'whitebalance_select_preset',
                            options: {preset: '43,50', force: true}
                        }
                    ]
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'whitebalance_select_preset',
                    options: {preset: '43,50', invert: false},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 255)
                    }
                }
            ]
        },

        // zoom
        {
            category: 'Zoom',
            name: 'Zoom In',
            type: 'button',
            style: {
                text: 'Zoom\nIN',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'zoom_manual_adjust',
                            options: {direction: 'tele', speed: 1}
                        }
                    ],
                    up: [
                        {
                            actionId: 'zoom_manual_adjust',
                            options: {direction: 'stop', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Zoom',
            name: 'Zoom Out',
            type: 'button',
            style: {
                text: 'Zoom\nOUT',
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'zoom_manual_adjust',
                            options: {direction: 'wide', speed: 1}
                        }
                    ],
                    up: [
                        {
                            actionId: 'zoom_manual_adjust',
                            options: {direction: 'stop', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Zoom',
            name: 'Change Zoom Speed',
            type: 'button',
            style: {
                text: 'Speed:\n' + cvar('zoom_speed'),
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            options: {rotaryActions: true},
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'zoom_speed',
                            options: {mode: 'dec', speed: 1}
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'zoom_speed',
                            options: {mode: 'inc', speed: 1}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
        {
            category: 'Zoom',
            name: 'Disable Digital Zoom',
            type: 'button',
            style: {
                text: 'D-Zoom:\n' + cvar('zoom_digital_zoom_limit'),
                size: '18',
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'zoom_digital_zoom_limit',
                            options: {limit: 'cycle'}
                        }
                    ]
                }
            ],
            feedbacks: []
        },
    )

    return presets
}


module.exports = getPresets