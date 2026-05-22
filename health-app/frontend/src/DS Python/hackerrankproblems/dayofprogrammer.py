

import os
import sys

#
# Complete the 'dayOfProgrammer' function below.
#
# The function is expected to return a STRING.
# The function accepts INTEGER year as parameter.
#

def dayOfProgrammer(year):

    # Transition year (calendar change)
    if year == 1918:
        return "26.09.1918"

    # Julian calendar (before 1918)
    if year < 1918:
        if year % 4 == 0:
            return f"12.09.{year}"
        else:
            return f"13.09.{year}"

    # Gregorian calendar (after 1918)
    else:
        if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
            return f"12.09.{year}"
        else:
            return f"13.09.{year}"


if __name__ == '__main__':
    year = int(input().strip())
    result = dayOfProgrammer(year)
    print(result)
