const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

    app.set('view engine','ejs');
    app.set('views', path.join(__dirname,'views'));
    app.use(express.urlencoded());
    app.use(express.static('assets'));

    var contactList=[
        {
            name:"Sonu",
            phone:"7891582108"
        }
    ];


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contact from database');
            return;
        }
        return res.render('home',{
                title:"My Contact List",
                contact_list:contacts
        });

    });

});

app.get('/practice',function(req,res){
    res.render('practice',{title:"Let's Play With me"});
});

app.post('/create-contact',function(req,res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creating a contact');
            return;
        }
        console.log('********',newContact)
        return res.redirect('back');
    });
});

// Deleting the contact by Query param
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error is running in server',err);
    }
    console.log('yup! My express server is running on the port',port);
});