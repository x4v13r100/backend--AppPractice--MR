import mongoose from 'mongoose';


const reporteSchema = new mongoose.Schema({

    nombreFinca: {
        type: String,
        required: true,
        trim: true
    },
    tipoError: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    tecnico: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        url: String,
        public_id: String,
    },
    
},
{
    timestamps: true,
}

);

const Reporte = mongoose.model('Reporte', reporteSchema);

export default Reporte;