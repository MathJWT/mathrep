That is my first contact with git.

//INIT
git init - create a repository

//ADD AND COMMIT
git add -A = add everything
git add file/ git add . = add a file to commit/ add all the files to the commit
git commit = insert changes in the project 
git commit -am = add all the files to commit and insert the changes, commiting

//See historic of something
git status - see if there is something to commit
git log - shows the commits
git diff - see the things that were excluded and things that were included 

//BRANCH AND OTHER THINGS RELATIONED
git branch = see the version of the project
git branch: can also create a new branch
branch master = the main version of the project - current version
git checkout = switch the branch you are

//SEQUELIZE STUFF

await Sequelize.findByPk(id);

await Sequelie.create({
    name, 
    email,
    cellphone,
    age,
    user_id
})

await Sequelize.update({
    name,
    email,
    cellphone,
    age
    }, {
    where: {
        id: {
            [Op.lte]: 10 // Less/equal than 10
        },
    }
})

if (*.txt) {
    const result = 'It is not gonna show the .txt files!'
    return result;
};

Contact.destroy({
    where: {
        id: user_id,
        name: contact_name
    }
})
.then(data => data.json())
.catch(e => {
    console.log(e)
})

await Contact.findAll({
    where: {
        email: {
            [Op.like]: '%ribeiro'
        }
    }
})

TESTANDO O GIT REVERT
VOU MUDAR ISSO DPS DE DAR O GIT REVERT



quero testar
a

a
a
a
a
a
a

a
a

a
a
a
a

a
a
    