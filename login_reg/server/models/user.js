const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: [true,'Email can\'t be blank'],
        unique: [true,'Email already exists'],
        validate:{
            validator: function(value) {
                return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            },
            message: "Please enter a valid email address"
        }
    },
    first_name: {
        type: String,
        required: [true,'First name can\'t be blank'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true,'Last name can\'t be blank'],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "The password needs to be more than 8 characters"],
        maxlength: [32, "The password needs to be less than 32 characters"],
        validate: {
          validator: function( value ) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
      },
    password_confirm: {
        type: String,
        required: true
    },
    birthday: {
			type: Date,
			required:true,
			validate: {
				validator: function ( value ){
					return value < new Date();
				},
				message: 'You can\t choose a future date.'
			}
	}
}, { timestamps: true });

UserSchema.pre('save',  function(next) {
    if(this.password != this.password_confirm){
        // This line will create an error message that matches the format of our other error messages
        this.invalidate('password', "Password and Password Confirmation must match");
        // In order for our pre-save method to fail we must pass an err into next()
        let err = new Error("Password and password confirmation do not match");
        next(err);
    }else{
        // remove password_confirmation so we're not storing it
        this.password_confirm = '';
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
        next();
    }
})
mongoose.model('User', UserSchema);
