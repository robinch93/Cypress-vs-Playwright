const { saveTopmenu, saveSubmenus } = require('./models/navigations')
require('./connection')

saveTopmenu()
saveSubmenus('computers')
saveSubmenus('electronics')





