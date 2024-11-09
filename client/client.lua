local function getNotifyPosition()
    return GetResourceKvpString("j-notify-POSITION") or Config.Defaultposition
end

local function setNotifyPosition(position)
    SetResourceKvp("j-notify-POSITION", position)
end

local function sendNUIMessage(data)
    SendNUIMessage(data)
end

function Alert(title, message, time, messagetype)
    messagetype = type(messagetype) == "string" and messagetype or 'info'
    time = type(time) == 'number' and time or 5000

    sendNUIMessage({
        action = 'open',
        title = title,
        type = messagetype,
        message = message,
        time = time,
        position = getNotifyPosition()
    })
end

RegisterCommand(Config.Settingcommand, function()
    SetNuiFocus(true, true)
    sendNUIMessage({
        action = 'opensetting',
        position = getNotifyPosition()
    })
end)

RegisterNUICallback("close", function()
    SetNuiFocus(false, false)
    sendNUIMessage({ message = "hide" })
end)

RegisterNUICallback("notify-position", function(data)
    setNotifyPosition(data)
end)

RegisterNetEvent('j-notify:Alert', Alert)

exports('Alert', Alert)



RegisterCommand('test', function()
    exports['j-notify']:Alert("SUCCESS", "This is TEST sucess MSG", 5000, 'success')
    exports['j-notify']:Alert("INFORMATION", "This is TEST Info MSG", 5000, 'info')
    exports['j-notify']:Alert("ERROR", "This is TEST error MSG", 5000, 'error')
    exports['j-notify']:Alert("WARNING", "This is TEST warning MSG", 5000, 'warning')
    exports['j-notify']:Alert("ANNOUNCEMENT", "This is  announcement MSG", 5000, 'announcement')
end)
