#Author-
#Description-

import adsk.core, adsk.fusion, traceback
import urllib
import json



app = adsk.core.Application.get()
ui  = app.userInterface

#for fake submit request 
userid = 'fengka'

# global set of event handlers to keep them referenced for the duration of the command
handlers = []

def callOurRestApi(method, restApi):
    url = 'http://fusionmarketplace.autodesk.com:8000' + restApi;
    f = urllib.request.urlopen(url)
    encoded = f.read().decode("utf-8")
    dic = json.loads(encoded)
    return (dic, f.code)

def commandDefinitionById(id):
    app = adsk.core.Application.get()
    ui = app.userInterface
    if not id:
        ui.messageBox('commandDefinition id is not specified')
        return None
    commandDefinitions_ = ui.commandDefinitions
    commandDefinition_ = commandDefinitions_.itemById(id)
    return commandDefinition_

def commandControlByIdForQAT(id):
    app = adsk.core.Application.get()
    ui = app.userInterface
    if not id:
        ui.messageBox('commandControl id is not specified')
        return None
    toolbars_ = ui.toolbars
    toolbarQAT_ = toolbars_.itemById('QAT')
    toolbarControls_ = toolbarQAT_.controls
    toolbarControl_ = toolbarControls_.itemById(id)
    return toolbarControl_

def commandControlByIdForPanel(id):
    app = adsk.core.Application.get()
    ui = app.userInterface
    if not id:
        ui.messageBox('commandControl id is not specified')
        return None
    workspaces_ = ui.workspaces
    modelingWorkspace_ = workspaces_.itemById('FusionSolidEnvironment')
    toolbarPanels_ = modelingWorkspace_.toolbarPanels
    toolbarPanel_ = toolbarPanels_.item(0)
    toolbarControls_ = toolbarPanel_.controls
    toolbarControl_ = toolbarControls_.itemById(id)
    return toolbarControl_

def destroyObject(uiObj, tobeDeleteObj):
    if uiObj and tobeDeleteObj:
        if tobeDeleteObj.isValid:
            tobeDeleteObj.deleteMe()
        else:
            uiObj.messageBox('tobeDeleteObj is not a valid object')
            
class CommandExecuteHandler(adsk.core.CommandEventHandler):
    def __init__(self):
        super().__init__()
    def notify(self, args):
        try:
            docName = app.activeDocument.name
            spaceIdx = docName.find(' ');
            if spaceIdx > 0:
                docName = docName[:spaceIdx]
            #command = args.firingEvent.sender
            content, response_code = callOurRestApi('GET', '/api/projects/fakesubmit?userid='+userid+'&name=' + docName)            
            #ui.messageBox('command: ' + command.parentCommandDefinition.id + ' executed successfully')
            #ui.messageBox('API returned: ' + str(response_code) + ' : ' + str(content))
        except:
            if ui:
                ui.messageBox('command executed failed:\n{}'.format(traceback.format_exc()))
                
class CommandCreatedEventHandlerQAT(adsk.core.CommandCreatedEventHandler):
    def __init__(self):
        super().__init__()
    def notify(self, args):
        try:
            command = args.command
            onExecute = CommandExecuteHandler()
            command.execute.add(onExecute)
            # keep the handler referenced beyond this function
            handlers.append(onExecute)
        except:
            if ui:
                ui.messageBox('QAT command created failed:\n{}'.format(traceback.format_exc()))

def addCommandToQAT(cmdId, cmdName):
    commandDefinitions_ = ui.commandDefinitions
    toolbars_ = ui.toolbars
    toolbarQAT_ = toolbars_.itemById('QAT')
    toolbarControlsQAT_ = toolbarQAT_.controls
    toolbarControlQAT_ = toolbarControlsQAT_.itemById(cmdId)
    if not toolbarControlQAT_:
        commandDefinitionQAT_ = commandDefinitions_.itemById(cmdId)
        if not commandDefinitionQAT_:
            commandDefinitionQAT_ = commandDefinitions_.addButtonDefinition(cmdId, cmdName, cmdName, './resbtn')
        onCommandCreated = CommandCreatedEventHandlerQAT()
        commandDefinitionQAT_.commandCreated.add(onCommandCreated)
        # keep the handler referenced beyond this function
        handlers.append(onCommandCreated)
        toolbarControlQAT_ = toolbarControlsQAT_.addCommand(commandDefinitionQAT_)
        toolbarControlQAT_.isVisible = True
        
def run(context):
    
    try:
        addCommandToQAT('fmpSubmitBtn', 'Submit');
    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))

def stop(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        objArrayQAT = []
        
        def prepareCmdForRemove(cmdId):
            commandControlQAT_ = commandControlByIdForQAT(cmdId)
            if commandControlQAT_:
                objArrayQAT.append(commandControlQAT_)
            commandDefinitionQAT_ = commandDefinitionById(cmdId)
            if commandDefinitionQAT_:
                objArrayQAT.append(commandDefinitionQAT_)
                
        prepareCmdForRemove('fmpSubmitBtn')

        for obj in objArrayQAT:
            destroyObject(ui, obj)

    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))
