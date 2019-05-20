const ApplySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    passportNumber: {
        type: String,
        required: true
    },
    passportMKK: {
        type: String,
        required: true
    },
    passportDate: {
        type: Date,
        required: true
    },
    family: [{
        memberType: MEMBER_TYPES,
        fullName: String,
        workPlace: String,
        studyPlace: String,
    }]
});

export const MEMBER_TYPES = {
    FATHER: 'father',
    MOTHER: 'mother',
    BROTHER: 'brother',
    SISTER: 'sister'
  };