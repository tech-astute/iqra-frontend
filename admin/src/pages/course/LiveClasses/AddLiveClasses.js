import { useState, useRef } from 'react';
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
    Button,
    Stack
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import JoditEditor from 'jodit-react';
// project import
import MainCard from 'components/MainCard';

import { useDispatch, useSelector } from 'react-redux';
import { addLiveClass } from 'actions/course/liveClass';
// import { addliveClass } from 'actions/course/course';
// ==============================|| SAMPLE PAGE ||============================== //
const copyStringToClipboard = function (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const facilityMergeFields = [
    'FacilityNumber',
    'FacilityName',
    'Address',
    'MapCategory',
    'Latitude',
    'Longitude',
    'ReceivingPlant',
    'TrunkLine',
    'SiteElevation'
];
const inspectionMergeFields = ['InspectionCompleteDate', 'InspectionEventType'];
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
    let optionGroupElement = document.createElement('optgroup');
    optionGroupElement.setAttribute('label', optionGrouplabel);
    for (let index = 0; index < mergeFields.length; index++) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('class', 'merge-field-select-option');
        optionElement.setAttribute('value', mergeFields[index]);
        optionElement.text = mergeFields[index];
        optionGroupElement.appendChild(optionElement);
    }
    return optionGroupElement;
};
const buttons = [
    'undo',
    'redo',
    '|',
    'bold',
    'strikethrough',
    'underline',
    'italic',
    '|',
    'superscript',
    'subscript',
    '|',
    'align',
    '|',
    'ul',
    'ol',
    'outdent',
    'indent',
    '|',
    'font',
    'fontsize',
    'brush',
    'paragraph',
    '|',
    'image',
    'link',
    'table',
    '|',
    'hr',
    'eraser',
    'copyformat',
    '|',
    'fullsize',
    'selectall',
    'print',
    '|',
    'source',
    '|',
    {
        name: 'insertMergeField',
        tooltip: 'Insert Merge Field',
        iconURL: 'images/merge.png',
        popup: (editor, current, self, close) => {
            function onSelected(e) {
                let mergeField = e.target.value;
                if (mergeField) {
                    console.log(mergeField);
                    editor.selection.insertNode(editor.create.inside.fromHTML('{{' + mergeField + '}}'));
                }
            }
            let divElement = editor.create.div('merge-field-popup');

            let labelElement = document.createElement('label');
            labelElement.setAttribute('class', 'merge-field-label');
            labelElement.text = 'Merge field: ';
            divElement.appendChild(labelElement);

            let selectElement = document.createElement('select');
            selectElement.setAttribute('class', 'merge-field-select');
            selectElement.appendChild(createOptionGroupElement(facilityMergeFields, 'Facility'));
            selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, 'Inspection'));
            selectElement.onchange = onSelected;
            divElement.appendChild(selectElement);

            console.log(divElement);
            return divElement;
        }
    },
    {
        name: 'copyContent',
        tooltip: 'Copy HTML to Clipboard',
        iconURL: 'images/copy.png',
        exec: function (editor) {
            let html = editor.value;
            copyStringToClipboard(html);
        }
    }
];

const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: 'en',
    toolbarButtonSize: 'medium',
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true
    },
    width: '100%',
    height: 400
};

const Tags = ({ data, handleDelete }) => {
    return (
        <Box
            sx={{
                background: '#1890FF',
                borderRadius: '0.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                padding: '0.4rem',
                margin: '0 0.5rem 0 0',
                justifyContent: 'center',
                alignContent: 'center',
                color: '#ffffff'
            }}
        >
            <Stack direction="row" gap={1}>
                <Typography>{data}</Typography>
                <Cancel
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        handleDelete(data);
                    }}
                />
            </Stack>
        </Box>
    );
};

const LiveClasses = (props) => {
    const { courses } = props;

    const videoTypes = [
        {
            videoType: 'Youtube',
        },
        {
            videoType: 'Vimeo',
        },
    ];

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

    const [liveClass, setLiveClass] = useState({
        course: '',
        thumbnail: '',
        title: '',
        videoType: '',
        videoLink: '',
        instructorName: '',
    });

    const [image, setImage] = useState();

    const handleChange = (event) => {
        setLiveClass({ ...liveClass, [event.target.name]: event.target.value });
    };

    const handleCourseChange = (event) => {
        setLiveClass({ ...liveClass, course: event.target.value });
    };

    const handleImageFile = (event) => {
        setImage(event.target.files[0]);
    };

    const handlevideoTypeChange = (event) => {
        setLiveClass({ ...liveClass, videoType: event.target.value });
    };

    const dispatch = useDispatch();

    const handleSubmit = () => {
        try {
            console.log(liveClass);
            const formData = new FormData();
            formData.append('course', liveClass.course);
            formData.append('thumbnail', image);
            formData.append('title', liveClass.title);
            formData.append('videoType', liveClass.videoType);
            formData.append('videoLink', liveClass.videoLink);
            formData.append('instructorName', liveClass.instructorName);
            dispatch(addLiveClass(formData));
            setLiveClass({
                course: '',
                thumbnail: '',
                title: '',
                videoType: '',
                videoLink: '',
                instructorName: '',
            });
            setImage();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2 }}>
                <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                    <InputLabel id="demo-simple-select-label">Course</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={liveClass.course}
                        label="Course"
                        onChange={handleCourseChange}
                    >
                        {courses.map((course) => (
                            <MenuItem value={course.course}>{course.course}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ width: '100%', ml: { xs: 0, sm: 1 }, mt: { xs: 2, sm: 0 } }}>
                    <Button
                        variant="outlined"
                        fullWidth
                        component="label"
                        style={{ height: '37px' }}
                        value={image}
                        onChange={(e) => handleImageFile(e)}
                    >
                        Select Thumbnail
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="title"
                    value={liveClass.title}
                    onChange={handleChange}
                />
                <FormControl fullWidth sx={{ ml: { sm: 1 }, mt:{xs:2, sm:0} }}>
                    <InputLabel id="demo-simple-select-label">Video Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={liveClass.videoType}
                        label="Video Type"
                        onChange={handlevideoTypeChange}
                    >
                        {videoTypes.map((videoType) => (
                            <MenuItem value={videoType.videoType}>{videoType.videoType}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Video Link"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="videoLink"
                    value={liveClass.videoLink}
                    onChange={handleChange}
                />
                <TextField
                    label="Instructor Name"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt:{xs:2, sm:0} }}
                    type="text"
                    name="instructorName"
                    value={liveClass.instructorName}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <Button variant="contained" color="primary" type="submit" onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default LiveClasses;
