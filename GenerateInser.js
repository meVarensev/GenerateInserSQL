const fs = require('fs');

const getInsert = async () => {
    const firstNamesMale = fs.readFileSync('./first_names.txt', 'utf-8').replace(/\r\n/g, '\n').split('\n');
    const lastNamesMale = fs.readFileSync('./last_names.txt', 'utf-8').replace(/\r\n/g, '\n').split('\n');
    const MiddleNamesMale = fs.readFileSync('./middle_names.txt', 'utf-8').replace(/\r\n/g, '\n').split('\n');


    const NamesFemale = fs.readFileSync('./fio_female.txt', 'utf-8').replace(/\r\n/g, '\n').split('\n');
    const LastNamesFem = NamesFemale.map(name => name.split(' ')[0]);
    const FirstNamesFem = NamesFemale.map(name => name.split(' ')[1]);
    const MiddleNamesFem = NamesFemale.map(name => name.split(' ')[2]);
    const dataBirth = [];

    let sdt = +new Date('01.02.1995');
    let edt = +new Date('01.01.2006');
    while (sdt <= edt) {
        dataBirth.push(new Date(sdt).toISOString());
        sdt = sdt + 1000 * 60 * 60 * 24;
    }

    let genSQL = '';
    for (let i = 0; i < 500; i++) {
        genSQL += `\nINSERT INTO Students (FirstName, LastName, MiddleName, DateBirth) VALUES`;
        for (let j = 0; j < 999; j++) {
            if (j < 499) {
                genSQL += `(N'${firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]}', N'${lastNamesMale[Math.floor(Math.random() * lastNamesMale.length)]}', N'${MiddleNamesMale[Math.floor(Math.random() * MiddleNamesMale.length)]}', '${dataBirth[Math.floor(Math.random() * dataBirth.length)]}'),`;
            }
            else {
                genSQL += `(N'${FirstNamesFem[Math.floor(Math.random() * FirstNamesFem.length)]}', N'${LastNamesFem[Math.floor(Math.random() * LastNamesFem.length)]}', N'${MiddleNamesFem[Math.floor(Math.random() * MiddleNamesFem.length)]}', '${dataBirth[Math.floor(Math.random() * dataBirth.length)]}'),`;
            }
        }
        genSQL += `(N'${firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]}', N'${lastNamesMale[Math.floor(Math.random() * lastNamesMale.length)]}', N'${MiddleNamesMale[Math.floor(Math.random() * MiddleNamesMale.length)]}', '${dataBirth[Math.floor(Math.random() * dataBirth.length)]}');`;
    }

    fs.writeFileSync('./insert.sql', genSQL);

}

getInsert();
