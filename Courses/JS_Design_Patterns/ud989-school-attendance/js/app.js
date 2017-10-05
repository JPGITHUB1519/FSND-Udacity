function generateRandomAttendance() 
{
    attendance = [];
    for (var i = 0; i < 12; i++) {
        attendance.push(Math.random() >= 0.5);
    }
    
    return attendance;
}

/* STUDENT APPLICATION */
$(function() {
    var model = {
        data: []
    }

    var octupus = {
        init: function() {
            this.fillAttendanceWithData();  
            attendanceView.init();
        },

        getData: function() {
            return model.data;
        },

        fillAttendanceWithData: function() {
            data = [
                {
                    "name": "Slappy the Frog"
                },
                {
                    "name": "Paulrus the Walrus"
                },
                {
                    "name": "Gregory the Goat"
                }, 
                {
                    "name": "Adam the Anaconda"
                }

            ];

            for (var i = 0; i < data.length; i++) {
                data[i]["attendance"] = generateRandomAttendance();
            }

            model.data = data;
        },

        updateStudentAttendanceDay: function(student_index, day, status) {
            /**
             * Update the to true or false the attendance for a student in a specific date
             *
             */
            model.data[student_index].attendance[day] = status;
            attendanceView.render();
        },

        getMissedDaysByStudent: function(student_index) {
            /**
             * Count the missing days for a given student
             *
             * returns: int 
             */
            var missed_days = model.data[student_index].attendance.filter(function(attendance) {
                return attendance == false;
            });

            return missed_days.length;
        }
    }

    var attendanceView = {
        init: function() {
            this.studentsBody = $("#students-body");
            this.studentAttendanceTemplate = `
            <tr class="student">
                <td class="name-col">{{student_name}}</td>
            `; 
            this.studentAttendanceCheckboxT = `
            <td class="attend-col"><input type="checkbox" {{status}} class="attendance-check" data-student_id= {{student_id}} data-day= {{day}} ></td>
            `;
            this.studentAttendanceMissingT = `
            <td class="missed-col">{{missed_number}}</td>`;

            //binding methods
            $(document).on('click', '.attendance-check', function(e) {
                var student_index = $(this).data("student_id");
                var day = $(this).data("day");
                var status = $(this).is(":checked");;
                console.log(student_index);
                octupus.updateStudentAttendanceDay(student_index, day, status);
            });

            this.render(); 
        },

        render: function() {
            data = model.data;
            this.studentsBody.html('');
            data.forEach(function(obj, index) {
                var template = this.studentAttendanceTemplate.replace("{{student_name}}", obj.name);
                for (var i = 0; i < obj.attendance.length; i++) {
                    var attendance_checkbox_template = "";
                    if (obj.attendance[i] == true) {
                        attendance_checkbox_template += this.studentAttendanceCheckboxT.replace("{{status}}", "checked");
                    } else {
                        attendance_checkbox_template += this.studentAttendanceCheckboxT;
                    }

                    attendance_checkbox_template = attendance_checkbox_template.replace("{{student_id}}", index);
                    attendance_checkbox_template = attendance_checkbox_template.replace("{{day}}", i);

                    template += attendance_checkbox_template
                }

                missed_days = octupus.getMissedDaysByStudent(index);
                template += this.studentAttendanceMissingT.replace("{{missed_number}}", missed_days)
                template += "</tr>";
                this.studentsBody.append(template);
            }.bind(this));
        }
    }

    octupus.init();
}); 
