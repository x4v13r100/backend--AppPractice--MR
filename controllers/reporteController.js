import Reporte from "../models/Reporte.js";
import fs from "fs-extra";
import {
    uploadImage, deleteImage
} from "../helper/cloudinary.js";




const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta gestionaremos todas las peticiones correspondiente al modelo de Reporte"
    })
};

const createReportes = async (req, res) => {
    try {
        const { nombreFinca, tipoError, descripcion, tecnico } = req.body; let image;
        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath); await fs.remove(req.files.image.tempFilePath); image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            console.log(result);
        }
        const Newreporte = new Reporte({ nombreFinca, tipoError, descripcion, image, tecnico });
        await Newreporte.save();
        return res.json(Newreporte);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

const getReportes = async (req, res) => {
    try {
        const Reportes = await Reporte.find();
        res.send(Reportes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updateReportes = async (req, res) => {
    const { id } = req.params;
    const { nombreFinca, tipoError, descripcion, tecnico } = req.body;
    //console.log(id, nombre, description, precio, stock);
    //console.log(req.files.image);
    try {
        const updateReporte = await Reporte.findById(id);
        updateReporte.nombreFinca = nombreFinca;
        updateReporte.tipoError = tipoError;
        updateReporte.descripcion = descripcion;
        updateReporte.tecnico = tecnico;
        if (req.files !== null) {
            if (req.files.image) {
                await deleteImage(updateReporte.image.public_id);
                const result = await uploadImage(req.files.image.tempFilePath); await fs.remove(req.files.image.tempFilePath);
                updateReporte.image = {
                    url: result.secure_url,
                    public_id: result.public_id,
                };
            }
        }
        await updateReporte.save();
        console.log(updateReporte);
        return res.status(200).json(updateReporte);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteReportes = async (req, res) => {
    try {
        const reportRemoved = await Reporte.findByIdAndDelete(req.params.id); if (!reportRemoved) {
            //const error = new Error("Token no valido");
            return res.sendStatus(404);
        } else {
            if (reportRemoved.image.public_id) {
                await deleteImage(reportRemoved.image.public_id);
            }
            return res.status(200).json({
                msg: "Reporte Eliminado exitosamente"
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getReporte = async (req, res) => {
    try {
        const OneReport = await Reporte.findById(req.params.id);
        if (!OneReport) {
            return res.status(404).json({
                msg: "No se encontro el Reporte"
            });
        } else {
            return res.json(OneReport);
        }
    } catch (error) {
        return res.status(500).json({ msg: "No se encontro el Reporte Menor" });
    }
};




export {
    prueba,
    createReportes,
    getReportes,
    updateReportes,
    deleteReportes,
    getReporte
};