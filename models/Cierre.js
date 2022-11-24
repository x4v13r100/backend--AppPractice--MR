import mongoose from 'mongoose';

const cierreShema = mongoose.Schema(

    {
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        atencion: {
            type: Array,
            required: true
        },
        confirmado: {
            type: Boolean,
            default: false,
        },
        estado: {
            type: String,
            default: "vigente",
        },
    },
    {
        timestamps: true,
    }
);

const Cierre = mongoose.model('Cierre', cierreShema);

export default Cierre;