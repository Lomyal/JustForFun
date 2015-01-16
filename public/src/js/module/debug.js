define(function (require, exports, module) {

    exports.d = dump_obj;
    exports.model =
            [
                {
                    "Course": [
                        {
                            "code": [
                                {
                                    "name": "code",
                                    "type": "string",
                                    "visibility": "public"
                                }
                            ],
                            "credit": [
                                {
                                    "name": "credit",
                                    "type": "float",
                                    "visibility": "private"
                                }
                            ],
                            "availability": [
                                {
                                    "name": "availability",
                                    "type": "CourseAvailability",
                                    "visibility": "protected",
                                    "readOnly": "True"
                                }
                            ]
                        },
                        {
                            "order": ["code", "credit", "availability"]
                        }
                    ],
                    "CourseActivity": [
                        {
                            "startTime": [
                                {
                                    "name": "startTime",
                                    "type": "Time"
                                }
                            ],
                            "endTime": [
                                {
                                    "name": "endTime",
                                    "type": "Time"
                                }
                            ]
                        },
                        {
                            "order": ["startTime", "endTime"]
                        }
                    ],
                    "Student": [
                        {
                            "code": [
                                {
                                    "name": "code",
                                    "type": "string"
                                }
                            ],
                            "enrollmentDate": [
                                {
                                    "name": "enrollmentDate",
                                    "type": "Date"
                                }
                            ]
                        },
                        {
                            "order": ["code", "enrollmentDate"]
                        }
                    ],
                    "Teacher": [
                        {
                            "facultyCode": [
                                {
                                    "name": "facultyCode",
                                    "type": "string"
                                }
                            ],
                            "title": [
                                {
                                    "name": "title",
                                    "type": "Title"
                                }
                            ]
                        },
                        {
                            "order": ["facultyCode", "title"]
                        }
                    ],
                    "User": [
                        {
                            "email": [
                                {
                                    "name": "email",
                                    "type": "string"
                                }
                            ],
                            "username": [
                                {
                                    "name": "username",
                                    "type": "string"
                                }
                            ],
                            "photo": [
                                {
                                    "name": "photo",
                                    "type": "Image"
                                }
                            ],
                            "password": [
                                {
                                    "name": "password",
                                    "type": "string"
                                }
                            ],
                            "birthDate": [
                                {
                                    "name": "birthDate",
                                    "type": "Date"
                                }
                            ],
                            "name": [
                                {
                                    "name": "name",
                                    "type": "string"
                                }
                            ]
                        },
                        {
                            "order": ["username", "password", "name", "birthDate", "email", "photo"]
                        }
                    ],
                    "Department": [
                        {
                            "name": [
                                {
                                    "name": "name",
                                    "type": "string"
                                }
                            ],
                            "code": [
                                {
                                    "name": "code",
                                    "type": "string"
                                }
                            ],
                            "requiredCreditOfM": [
                                {
                                    "name": "requiredCreditOfM",
                                    "type": "RequiredCredit"
                                }
                            ],
                            "requiredCreditOfB": [
                                {
                                    "name": "requiredCreditOfB",
                                    "type": "RequiredCredit"
                                }
                            ],
                            "requiredCreditOfD": [
                                {
                                    "name": "requiredCreditOfD",
                                    "type": "RequiredCredit"
                                }
                            ]
                        },
                        {
                            "order": ["name", "code", "requiredCreditOfB", "requiredCreditOfM", "requiredCreditOfD"]
                        }
                    ]
                },
                {
                    "Course-CourseActivity": [
                        {
                            "tempid1419265720151": [
                                {
                                    "type": [
                                        "Composition",
                                        "possess"
                                    ],
                                    "role": [
                                        "whole",
                                        "part"
                                    ],
                                    "class": [
                                        "Course",
                                        "CourseActivity"
                                    ],
                                    "multiplicity": [
                                        "1",
                                        "*"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419265720151"]
                        }
                    ],
                    "Course-Student": [
                        {
                            "tempid1419597303227": [
                                {
                                    "type": [
                                        "Association",
                                        ""
                                    ],
                                    "class": [
                                        "Course",
                                        "Student"
                                    ],
                                    "multiplicity": [
                                        "0..*",
                                        "*"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597303227"]
                        }
                    ],
                    "Course-Teacher": [
                        {
                            "tempid1419597378206": [
                                {
                                    "type": [
                                        "Association",
                                        ""
                                    ],
                                    "class": [
                                        "Course",
                                        "Teacher"
                                    ],
                                    "multiplicity": [
                                        "0..*",
                                        "1..*"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597378206"]
                        }
                    ],
                    "Student-User": [
                        {
                            "tempid1419597406622": [
                                {
                                    "type": [
                                        "Generalization",
                                        ""
                                    ],
                                    "role": [
                                        "father",
                                        "child"
                                    ],
                                    "class": [
                                        "User",
                                        "Student"
                                    ],
                                    "multiplicity": [
                                        "1",
                                        "1"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597406622"]
                        }
                    ],
                    "Teacher-User": [
                        {
                            "tempid1419597442832": [
                                {
                                    "type": [
                                        "Generalization",
                                        ""
                                    ],
                                    "role": [
                                        "father",
                                        "child"
                                    ],
                                    "class": [
                                        "User",
                                        "Teacher"
                                    ],
                                    "multiplicity": [
                                        "1",
                                        "1"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597442832"]
                        }
                    ],
                    "Course-Department": [
                        {
                            "tempid1419597640012": [
                                {
                                    "type": [
                                        "Association",
                                        ""
                                    ],
                                    "class": [
                                        "Course",
                                        "Department"
                                    ],
                                    "multiplicity": [
                                        "*",
                                        "1"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597640012"]
                        }
                    ],
                    "Department-Student": [
                        {
                            "tempid1419597702615": [
                                {
                                    "type": [
                                        "Association",
                                        ""
                                    ],
                                    "class": [
                                        "Department",
                                        "Student"
                                    ],
                                    "multiplicity": [
                                        "1..*",
                                        "*"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597702615"]
                        }
                    ],
                    "Department-Teacher": [
                        {
                            "tempid1419597718239": [
                                {
                                    "type": [
                                        "Association",
                                        ""
                                    ],
                                    "class": [
                                        "Department",
                                        "Teacher"
                                    ],
                                    "multiplicity": [
                                        "1..*",
                                        "*"
                                    ]
                                }
                            ]
                        },
                        {
                            "order": ["tempid1419597718239"]
                        }
                    ]
                }
            ];

    // debug function
    function dump_obj(myObject) {
        var s = "";
        for (var property in myObject) {
            s = s + "\n " + property + ": " + myObject[property];
        }
        alert(s);
    }



});