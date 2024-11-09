# J Notify
A lightweight and configurable notification system for FiveM, with options for positioning, notification type, and duration settings saved via KVP. This script is easy to set up and provides a clean and user-friendly way to display notifications in your server.

# Features
* Configurable Position: Set the notification display position to suit your UI needs.
* Persistent Settings: Saves settings through KVP (Key-Value Pair), ensuring preferences remain consistent across sessions.
* Flexible Notifications: Supports various notification types and customizable display duration.

# Installation
* Download the j-notify file and place it in your resources directory.
* Add start j-notify to your server.cfg file to ensure it loads on server start.

# Usage

## Client Side
```lua
   exports['j-notify']:Alert("Title", "Message", Time, 'type')

```
## Server Side
```lua
   TriggerClientEvent('j-notify:Alert', source, "Title", "Message", Time, 'type')

```

## Parameters
* Title: The title text of the notification.
* Message: The main message or body text of the notification.
* Time: Display duration in milliseconds (e.g., 1000 for 1 second, 5000 for 5 seconds).
* Type: The type of notification (see below for options).

# Setting Notification Display Time
   1. 1000 - `[1 second]`
   2. 2000 - `[2 seconds]`
   3. 5000 - `[5 seconds]`
   4. 10000 - `[10 seconds]`
   5. etc...

# Notification Types

Change the notification type by selecting one of the following options:

* success: For successful actions or confirmations.
* info: For informational messages.
* warning: For cautionary or alerting messages.
* error: For error notifications.
* announcement: For announcements or special information.

# Configuring Notification Position
You can set the default notification position using the /setnotify command in-game:

* Type /setnotify in the chat.
* Click on the area of the screen where you'd like notifications to appear.
* The position will be saved and applied to all future notifications.

# Notification Samples

<img src="https://r2.fivemanage.com/WcNmcqGHf2fa5LZLnVlft/images/notify.png" alt="Notification Example" width="800" height = "800"/>

# Setting Position

<img src="https://r2.fivemanage.com/WcNmcqGHf2fa5LZLnVlft/images/set_notify.png" alt="Setting Position" width="400" height = "800"/>
