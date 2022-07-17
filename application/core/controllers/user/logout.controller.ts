export const logoutController = (req, res, next) => {
    {
        console.log("logout");
        req.session.destroy((err) => {
            if (err) {
                console.log("ha habido un error al destruir la sesion")
            }
            console.log("sin error al destruir la sesion")
            return res.clearCookie('session_recify', {path: '/'}).status(201).json("session finalizada")
        })
    }
}