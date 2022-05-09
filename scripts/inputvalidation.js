function isIntegerInRange(validate, min, max)
{
    num = parseInt(validate);
    if (isNaN(num))
        return false;
    if (num >= min && num <= max)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isFloatInRange(validate, min, max)
{
    num = parseFloat(validate);
    if (isNaN(num))
        return false;
    if (num >= min && num <= max)
    {
        return true;
    }
    else
    {
        return false;
    }
}