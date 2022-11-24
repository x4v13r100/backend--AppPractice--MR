import Cierre from "../models/Cierre.js";



const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta gestionaremos todas las peticiones correspondiente al modelo de Cierre"
    })
};

const createCierres = async (req, res) => {
    try {
        const cierre = new Cierre(req.body); const cierreGuardado = await cierre.save(); res.json(cierreGuardado);
    } catch (error) {
        console.error(error.message);
    }
};

const getCierre = async (req, res) => {
    try {
        const OneCierre = await Cierre.findById(req.params.id); if (!OneCierre) {
            return res.sendStatus(404);
        } else {
            return res.json(OneCierre);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCierres = async (req, res) => {
    try {
        const cierres = await Cierre.find();
        res.send(cierres);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updateCierres = async (req, res) => {
    try {
        const estadoCierre = await Cierre.findById(req.params.id); if (estadoCierre.estado === "vigente") {
            estadoCierre.estado = "cancelada";
            await estadoCierre.save();
            res.json({
                msg: "Cierre Finalizado correctamente"
            });
        } else {
            res.json({
                msg: "El Cierre ya esta finalizado"
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export {
    prueba,
    createCierres,
    getCierre,
    getCierres,
    updateCierres,
};