import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Box,
  Input,
  InputLabel,
  Button,
  Autocomplete,
  TextField,
  FormHelperText,
} from '@mui/material';
import { createUserAPI } from '../../api';
import { loginStyles } from './styles';
import { Profanity, ProfanityOptions } from '@2toad/profanity';
import MajorsContext from './MajorsContext';
import MinorsContext from './MinorsContext';
import GradYearsContext from './GradYearsContext';
import { AuthContext } from '../../context/AuthContext';

// Set up profanity checker
const options = new ProfanityOptions();
options.wholeWord = false;
const profanity = new Profanity(options);

interface SignupFormProps {
  name: string;
  email: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ name, email }) => {
  const styles = loginStyles();
  const navigate = useNavigate();

  const availableMajors = useContext(MajorsContext);
  const availableMinors= useContext(MinorsContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const availableGradYears = useContext(GradYearsContext);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedMinor, setSelectedMinor] = useState<string | null>(null);
  const [selectedGradYear, setSelectedGradYear] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const [showError, setShowError] = useState(false);
  const [nameEmptyError, setNameEmptyError] = useState(false);
  const [nameLengthError, setNameLengthError] = useState(false);
  const [nameProfanityError, setNameProfanityError] = useState(false);
  const [majorEmptyError, setMajorEmptyError] = useState(false);
  const [gradYearEmptyError, setGradYearEmptyError] = useState(false);
  const [minorError, setMinorError] = useState<String | null>(null);
  const [profilePictureError, setProfilePictureError] = useState<String | null>(null);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    minor: '',
    major: '',
    expectedGraduateYear: 0,
    profilePicture: profilePicture,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onMajorChange = (e: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedMajor(value);
    setFormData({ ...formData, major: value || '' });
  };
  const onMinorChange = (e: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedMinor(value);
    setFormData({ ...formData, minor: value || '' });
  };

  const onGradYearChange = (e: React.ChangeEvent<{}>, value: string | null) => {
    const numValue = Number(value);
    setSelectedGradYear(value);
    setFormData({ ...formData, expectedGraduateYear: numValue });
  };

  const onProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setProfilePictureError('Please select a valid image file.');
        return;
      }

      const maxSize = 8 * 1024 * 1024; // 8 MB
      if (file.size > maxSize) {
        setProfilePictureError('File size exceeds the limit of 8 MB.');
        return; 
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
        setFormData({ ...formData, profilePicture: base64String });
        setProfilePictureError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error states
    setNameEmptyError(false);
    setNameLengthError(false);
    setNameProfanityError(false);
    setMajorEmptyError(false);
    setGradYearEmptyError(false);
    setProfilePictureError(null);
    setMinorError(null);

    let hasErrors = false;

    // Validate name
    if (formData.name.trim() === '') {
      setNameEmptyError(true);
      hasErrors = true;
    } else if (formData.name.length < 5 || formData.name.length > 20) {
      setNameLengthError(true);
      hasErrors = true;
    }
    if (profanity.exists(formData.name)) {
      setNameProfanityError(true);
      hasErrors = true;
    }

    // Validate major
    if (!selectedMajor) {
      setMajorEmptyError(true);
      hasErrors = true;
    }

    // Validate graduation year
    if (!selectedGradYear) {
      setGradYearEmptyError(true);
      hasErrors = true;
    }

    if (hasErrors) {
      setShowError(true);
    } else {
      setShowError(false);
      createUserAPI(formData)
        .then(() => {
          // set logged in to true
          setIsLoggedIn(true);
          console.log('New User Successfully Logged In');
          // cheat fix for now
          window.location.reload();
          navigate('/membership');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Box
      component="form"
      sx={styles.signupForm}
      noValidate
      autoComplete="off"
      onSubmit={onFormSubmit}
    >
      <FormControl
        fullWidth
        required
        variant="standard"
        sx={styles.inputField}
        error={showError && (nameEmptyError || nameLengthError || nameProfanityError)}
      >
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          name="name"
          aria-describedby="my-helper-text"
          defaultValue={formData.name}
          onChange={onInputChange}
        />
        {!showError && (
          <FormHelperText id="name-error-text">Please enter your display name</FormHelperText>
        )}
        {showError && (
          <>
            {nameEmptyError && (
              <FormHelperText id="name-empty-error-text">
                Please enter a display name.
              </FormHelperText>
            )}
            {nameLengthError && (
              <FormHelperText id="name-length-error-text">
                Name should be between 5 and 20 characters.
              </FormHelperText>
            )}
            {nameProfanityError && (
              <FormHelperText id="name-profanity-error-text">
                Please choose a different name without profanity.
              </FormHelperText>
            )}
          </>
        )}
      </FormControl>
      <FormControl fullWidth disabled variant="standard" sx={styles.inputField}>
        <InputLabel htmlFor="email">Email address</InputLabel>
        <Input
          id="email"
          name="email"
          aria-describedby="my-helper-text"
          defaultValue={formData.email}
          onChange={onInputChange}
        />
      </FormControl>
      <FormControl
        fullWidth
        required
        variant="standard"
        sx={styles.inputField}
        error={showError && majorEmptyError}
      >
        <Autocomplete
          id="major"
          options={availableMajors}
          value={selectedMajor}
          onChange={onMajorChange}
          renderInput={(params) => <TextField {...params} label="Major *" />}
        />
        {!showError && (
          <FormHelperText id="major-error-text">Please select your major</FormHelperText>
        )}
        {showError && (
          <>
            {majorEmptyError && (
              <FormHelperText id="major-empty-error-text">Please select your major.</FormHelperText>
            )}
          </>
        )}
      </FormControl>
      <FormControl
        fullWidth
        required
        variant="standard"
        sx={styles.inputField}
      >
        <Autocomplete
          id="minor"
          options={availableMinors}
          value={selectedMinor}
          onChange={onMinorChange}
          renderInput={(params) => <TextField {...params} label="Minor" />}
        />
        {minorError && <p style={{ color: 'red' }}>{minorError}</p>}
      </FormControl>
      <FormControl
        fullWidth
        required
        variant="standard"
        sx={styles.inputField}
        error={showError && gradYearEmptyError}
      >
        <Autocomplete
          id="expected-graduate-year"
          options={availableGradYears}
          value={selectedGradYear}
          onChange={onGradYearChange}
          renderInput={(params) => <TextField {...params} label="Expected Graduation Year *" />}
        />
        {!showError && (
          <FormHelperText id="expected-graduate-year-error-text">
            Please select your expected graduation year
          </FormHelperText>
        )}
        {showError && (
          <>
            {gradYearEmptyError && (
              <FormHelperText id="expected-graduate-year-empty-error-text">
                Please select an expected graduation year.
              </FormHelperText>
            )}
          </>
        )}
      </FormControl>
      
      <FormControl
        fullWidth
        variant="standard"
        sx={styles.inputField}
      >
        <InputLabel
          htmlFor="profile-picture"
          shrink
        >
          Upload a Profile Picture (Optional)
        </InputLabel>
        <Input
          id="profile-picture"
          name="profilePicture"
          type="file"
          onChange={onProfilePictureChange}
        />
        {profilePictureError && <p style={{ color: 'red' }}>{profilePictureError}</p>}
      </FormControl>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            ...styles.inputField,
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
