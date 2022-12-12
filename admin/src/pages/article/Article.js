import { useState } from 'react';
import React from 'react';
// material-ui
import {
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Button
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Article = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const tagsArray = [
        'History',
        'Political Science',
        'Geography',
        'Economics',
        'Mathematics',
        'Public Administration',
        'Ethics',
        'Chemistry',
        'Sociology'
    ];

    const subjectArray = [
        'History',
        'Political Science',
        'Geography',
        'Economics',
        'Mathematics',
        'Public Administration',
        'Ethics',
        'Chemistry',
        'Sociology'
    ];

    const [optionsData, setOptionsData] = useState({
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: ''
    });

    const [article, setArticle] = useState({
        heading: '',
        rating: '',
        tags: '',
        prelims: '',
        mains: '',
        editor: '',
        questionHeading: '',
        question: '',
        options: '',
        answer: '',
        subject: ''
    });

    const handleChange = (event) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };

    const handleOptionChange = (event) => {
        setOptionsData({ ...optionsData, [event.target.name]: event.target.value });
    };
    const [tag, setTag] = useState([]);

    const handleTagsChange = (event) => {
        const {
            target: { value }
        } = event;
        setTag(typeof value === 'string' ? value.split(',') : value);
        console.log(tag);
    };

    const handleSubjectChange = (event) => {
        setArticle({ ...article, subject: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const request = {
                heading: article.heading,
                rating: article.rating,
                tags: tag,
                prelims: article.prelims,
                mains: article.mains,
                editor: article.editor,
                questionHeading: article.questionHeading,
                question: article.question,
                options: optionsData,
                answer: article.answer,
                subject: article.subject
            };
            console.log(request);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainCard title="Article">
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Heading"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="heading"
                        value={article.heading}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Rating"
                        variant="outlined"
                        fullWidth
                        sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                        type="text"
                        name="rating"
                        value={article.rating}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Prelims"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="prelims"
                        value={article.prelims}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Mains"
                        variant="outlined"
                        fullWidth
                        sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                        type="text"
                        name="mains"
                        value={article.mains}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={tag}
                            onChange={handleTagsChange}
                            input={<OutlinedInput label="Tags" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {tagsArray.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={tag.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}>
                        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={article.subject}
                            label="Subject"
                            onChange={handleSubjectChange}
                        >
                            {subjectArray.map((subject) => (
                                <MenuItem value={subject}>{subject}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Data Source"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        type="text"
                        name="editor"
                        value={article.editor}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Question Heading"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="questionHeading"
                        value={article.questionHeading}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                        type="text"
                        name="question"
                        value={article.question}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Option A"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="optionA"
                        value={optionsData.optionA}
                        onChange={handleOptionChange}
                    />
                    <TextField
                        label="Option B"
                        variant="outlined"
                        fullWidth
                        sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                        type="text"
                        name="optionB"
                        value={optionsData.optionB}
                        onChange={handleOptionChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Option C"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="optionC"
                        value={optionsData.optionC}
                        onChange={handleOptionChange}
                    />
                    <TextField
                        label="Option D"
                        variant="outlined"
                        fullWidth
                        sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                        type="text"
                        name="optionD"
                        value={optionsData.optionD}
                        onChange={handleOptionChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Correct Answer"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="answer"
                        value={article.answer}
                        onChange={handleChange}
                    />
                    <Box sx={{ width: '100%', ml: { sm: 1 } }} />
                </Box>
                <Box>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Box>
            </form>
        </MainCard>
    );
};

export default Article;
