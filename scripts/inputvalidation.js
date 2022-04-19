function isIntegerInRange(validate, min, max)
{
    num = parseInt(validate);
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
    if (num >= min && num <= max)
    {
        return true;
    }
    else
    {
        return false;
    }
}