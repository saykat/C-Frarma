
const prescription = require('../models/prescription');
const patient = require('../models/patient');
const prescribeAdvice = require('../models/prescribeAdvice');
const prescribeComplaint = require('../models/prescribeComplaint');
const prescribeDiagnosis = require('../models/prescribeDiagnosis');
const prescribeInvestigation = require('../models/prescribeInvestigation');
const prescribeMedicine = require('../models/prescribeMedicine');
const prescribeProcedure = require('../models/prescribeProcedure');

const prescriptionService = require('../services/prescription.service');
const patientService = require('../services/patient.service');
const prescribeAdviceService = require('../services/prescribeAdvice.service');
const prescribeComplaintService = require('../services/prescribeComplaint.service');
const prescribeDiagnosisService = require('../services/prescribeDiagnosis.service');
const prescribeMedicineService = require('../services/prescribeMedicine.service');
const prescribeProcedureService = require('../services/prescribeProcedure.service');
const prescribeInvestigationService = require('../services/prescribeInvestigation.service');

module.exports.save = (req, res, next)=>{

    // let patientId = req.body.patientId;
    let abc = 'abc'
    let newPrescription = new prescription();
    newPrescription.patientId = 0;
    newPrescription.visitId = 1;
    newPrescription.nextVisit = '2018-12-12';
    newPrescription.commit = 'example';
    // newPrescription.prescribeAdvices = ['5ac5225190d9471adc5cfb96','5ac5225190d9471adc5cfb97']
    prescriptionService.save(newPrescription, (err, prescription) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            //saving patient
            if(req.body.patient.exist != true){
                let newPatient = new patient();
                newPatient.name = req.body.patient.name;
                newPatient.gender = req.body.patient.gender;
                newPatient.age = req.body.patient.age;
                newPatient.address = req.body.patient.address;
                newPatient.phone = req.body.patient.phone;
                newPatient.status = 1;

                patientService.save(newPatient)
                newPrescription.patientId = newPatient._id;
            }

            //saving medicines
            let medicines = req.body.medicines;
            if(medicines.length>0){
                medicines.forEach((medicine)=>{
                    let newPrescribeMedicine = new prescribeMedicine();
                    newPrescribeMedicine.prescriptionId = prescription._id;
                    newPrescribeMedicine.medicineId = medicine._id;
                    newPrescribeMedicine.power = medicine.power;
                    newPrescribeMedicine.dose = medicine.dose;
                    newPrescribeMedicine.days = medicine.days;
                    newPrescribeMedicine.status = 1;
                    prescribeMedicineService.save(newPrescribeMedicine);
                    newPrescription.prescribeMedicines.push(newPrescribeMedicine);
                })
            }

            let advices = req.body.advices;
            if(advices.length>0){
                advices.forEach((advice)=>{
                    newPrescription.advices.push(advice._id)
                })
            }
            let complaints = req.body.complaints;
            if(complaints.length>0){
                complaints.forEach((complaint)=>{
                    newPrescription.complaints.push(complaint._id)
                })
            }
            let diagnosises = req.body.diagnosises;
            if(diagnosises.length>0){
                diagnosises.forEach((diagnosise)=>{
                    newPrescription.diagnosises.push(diagnosise._id)
                })
            }
            let investigations = req.body.investigations;
            if(investigations.length>0){
                investigations.forEach((investigation)=>{
                    newPrescription.investigations.push(investigation._id)
                })
            }
            let procedures = req.body.procedures;
            if(procedures.length>0){
                procedures.forEach((procedure)=>{
                    newPrescription.procedures.push(procedure._id)
                })
            }

            prescription.save()
            res.json({success: true, msg: 'new record successfully saved', prescription: prescription, test: abc});
            // await res.json({success: true, msg: 'new record successfully saved', prescription: prescription, test: abc});
        }
    })

    // res.json({success: false, msg: 'failed to save ', res: req.body});





}


module.exports.view = (req, res, next) => {
    prescriptionService.viewAll( (err, prescriptions)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: prescriptions});
        }
    })
}