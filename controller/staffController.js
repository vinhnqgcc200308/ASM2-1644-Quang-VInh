const express = require('express');
const mongoose = require('mongoose');
const Staff = mongoose.model('Staff');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("staff/addOrEdit", {
        viewTitle: "Insert Staff Information"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var staff = new Staff();
    staff.name = req.body.name;
    staff.age = req.body.age;
    staff.gender = req.body.gender;
    staff.department = req.body.department;
    staff.country = req.body.country;
    staff.email = req.body.email;
    staff.phone = req.body.phone;

    staff.save((err, doc) => {
        if (!err) {
            res.redirect('staff/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("staff/addOrEdit", {
                    viewTitle: "Insert Staff Information",
                    staff: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Staff.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('staff/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("staff/addOrEdit", {
                    viewTitle: 'Update Staff Information',
                    staff: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Staff.find((err, docs) => {
        if (!err) {
            res.render("staff/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Staff.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("staff/addOrEdit", {
                viewTitle: "Update Staff Information",
                staff: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Staff.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/staff/list');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'age':
                body['ageError'] = err.errors[field].message;
                break;
            case 'gender':
                body['genderError'] = err.errors[field].message;
                break;
            case 'department':
                body['departmentError'] = err.errors[field].message;
                break;
            case 'country':
                body['countryError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'phone':
                body['phoneError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;