// Demo for denying direct browser access to API routes.

if (req.headers['sec-fetch-site'] === 'none') {
    res.sendStatus(403)
} else {
    res.json({})
}
