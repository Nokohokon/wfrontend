'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

type Language = 'en' | 'de'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'message.content': 'Message Content',
    'embed.add': 'Add Embed',
    'embed.remove': 'Remove Embed',
    'embed.title': 'Title',
    'embed.titleUrl': 'Title URL',
    'embed.description': 'Description',
    'embed.color': 'Color',
    'embed.authorName': 'Author Name',
    'embed.authorIconUrl': 'Author Icon URL',
    'embed.thumbnail': 'Thumbnail URL',
    'embed.image': 'Image URL',
    'embed.footer': 'Footer',
    'embed.footerIconUrl': 'Footer Icon URL',
    'embed.addField': 'Add Field',
    'embed.fieldName': 'Field Name',
    'embed.fieldValue': 'Field Value',
    'embed.fieldInline': 'Inline',
    'embed.preview': 'Preview',
    'theme.toggle': 'Toggle Theme',
    'lang.toggle': 'Change Language',
    'settings.title': 'Settings',
    'settings.botNickname': 'Bot Nickname',
    'settings.botNicknamePlaceholder': 'Enter bot nickname',
    'settings.activityStatus': 'Activity Status',
    'settings.selectStatus': 'Select status',
    'settings.statusOnline': 'Online',
    'settings.statusIdle': 'Idle',
    'settings.statusDnd': 'Do Not Disturb',
    'settings.statusInvisible': 'Invisible',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language',
    'settings.saveSettings': 'Save Settings',
    'settings.logout': 'Logout',
    'dashboard.managingServer': 'Manage Server',
    'dashboard.embedCreator': 'Embed Creator',
    'dashboard.moderation': 'Moderation',
    'dashboard.giveaways': 'Giveaways',
    'dashboard.server': 'Server',
    'dashboard.selectServer': 'Select a server',
    'dashboard.channel': 'Channel',
    'dashboard.selectChannel': 'Select a channel',
    'dashboard.messageContent': 'Message Content',
    'dashboard.enterMessageContent': 'Enter your message content',
    'dashboard.embeds': 'Embeds',
    'dashboard.addEmbed': 'Add Embed',
    'dashboard.sendMessage': 'Send Message',
    'moderation.title': 'Moderation',
    'moderation.action': 'Action',
    'moderation.selectAction': 'Select an action',
    'moderation.warn': 'Warn',
    'moderation.mute': 'Mute',
    'moderation.kick': 'Kick',
    'moderation.ban': 'Ban',
    'moderation.userId': 'User ID',
    'moderation.enterUserId': 'Enter user ID',
    'moderation.reason': 'Reason',
    'moderation.enterReason': 'Enter reason for action',
    'moderation.takeAction': 'Take Action',
    'moderation.viewProfile': 'View Profile',
    'giveaways.title': 'Giveaways',
    'giveaways.prize': 'Prize',
    'giveaways.enterPrize': 'Enter giveaway prize',
    'giveaways.winners': 'Number of Winners',
    'giveaways.enterWinners': 'Enter number of winners',
    'giveaways.duration': 'Duration (hours)',
    'giveaways.enterDuration': 'Enter giveaway duration',
    'giveaways.createGiveaway': 'Create Giveaway',
    'giveaways.create': 'Create Giveaway',
    'giveaways.createDescription': 'Set up a new giveaway',
    'giveaways.endsAt': 'Ends At',
    'giveaways.description': 'Description',
    'giveaways.enterDescription': 'Enter giveaway description',
    'giveaways.created': 'Giveaway created successfully',
    'giveaways.active': 'Active Giveaways',
    'giveaways.edit': 'Edit',
    'login.welcome': 'Welcome to Discord Bot Dashboard',
    'login.loginWithDiscord': 'Login with Discord',
    'login.loggingIn': 'Logging in...',
    'login.failed': 'Login failed. Please try again.',
    'nav.logout': 'Logout',
    'dashboard.clickToManage': 'Click to manage this server',
    'dashboard.manage': 'Manage',
    'settings.serverSettings': 'Server Settings: {server}',
    'settings.botCommanderRole': 'Bot Commander Role',
    'settings.selectRole': 'Select a role',
    'settings.saved': 'Settings saved successfully',
    'serverLogs.title': 'Server Logs: {server}',
    'serverLogs.timestamp': 'Timestamp',
    'serverLogs.action': 'Action',
    'serverLogs.user': 'User',
    'serverLogs.details': 'Details',
    'serverLogs.filterPlaceholder': 'Filter logs...',
    'serverLogs.filterByAction': 'Filter by action',
    'serverLogs.allActions': 'All Actions',
    'serverLogs.commandUsed': 'Command Used',
    'serverLogs.moderation': 'Moderation',
    'serverLogs.giveaway': 'Giveaway',
    'profile.title': 'Profile Overview',
    'profile.description': 'View and edit your profile information',
    'profile.loading': 'Loading profile...',
    'profile.username': 'Username',
    'profile.email': 'Email',
    'profile.edit': 'Edit Profile',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'nav.profile': 'Profile',
    'profile.userProfile': 'User Profile',
    'profile.userProfileDescription': 'Detailed information about the user',
    'profile.close': 'Close',
    'profile.joinedServer': 'Joined Server',
    'profile.roles': 'Roles',
    'profile.punishmentHistory': 'Punishment History',
    'profile.punishmentType': 'Type',
    'profile.reason': 'Reason',
    'profile.date': 'Date',
    'profile.moderator': 'Moderator',
    'profile.noPunishments': 'No punishment history',
    'giveaways.edited': 'Giveaway edited successfully',
    'giveaways.saveChanges': 'Save Changes',
    'profile.discordId': 'Discord ID',
    'profile.joinedDiscord': 'Joined Discord',
    'moderation.userList': 'User List',
    'moderation.selectUserDescription': 'Select a user to moderate',
    'moderation.actionDescription': 'Choose an action to take',
    'dashboard.settings': 'Settings',
    'dashboard.logs': 'Logs',
    'embedCreator.title': 'Embed Creator',
    'embedCreator.selectChannel': 'Select Channel',
    'embedCreator.selectChannelPlaceholder': 'Choose a channel',
    'embedCreator.messageType': 'Message Type',
    'embedCreator.newMessage': 'New Message',
    'embedCreator.editMessage': 'Edit Existing Message',
    'embedCreator.selectMessage': 'Select Message',
    'embedCreator.selectMessagePlaceholder': 'Choose a message to edit',
    'embedCreator.messageContent': 'Message Content',
    'embedCreator.messageContentPlaceholder': 'Enter your message content',
    'embedCreator.embeds': 'Embeds',
    'embedCreator.addEmbed': 'Add Embed',
    'embedCreator.sendMessage': 'Send Message',
    'embedCreator.embed': 'Embed',
    'embedCreator.removeEmbed': 'Remove Embed',
    'embedCreator.title': 'Title',
    'embedCreator.description': 'Description',
    'embedCreator.color': 'Color',
    'embedCreator.addField': 'Add Field',
    'embedCreator.fieldName': 'Field Name',
    'embedCreator.fieldValue': 'Field Value',
    'embedCreator.fieldInline': 'Inline',
    'embedCreator.messageSent': 'Message sent successfully',
    'serverStatistics.title': 'Server Statistics',
    'serverStatistics.loading': 'Loading server statistics...',
    'serverStatistics.users': 'Users',
    'serverStatistics.channels': 'Channels',
    'serverStatistics.roles': 'Roles',
    'serverStatistics.emojis': 'Emojis',
    'serverStatistics.boostLevel': 'Boost Level',
    'pinnedMessages.title': 'Pinned Messages',
    'pinnedMessages.filterPlaceholder': 'Filter messages...',
    'pinnedMessages.filterByChannel': 'Filter by channel',
    'pinnedMessages.allChannels': 'All Channels',
    'pinnedMessages.content': 'Content',
    'pinnedMessages.channel': 'Channel',
    'pinnedMessages.author': 'Author',
    'pinnedMessages.pinnedAt': 'Pinned At',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy Policy',
    'footer.tos': 'Terms of Service',
    'footer.allRightsReserved': 'All rights reserved.',
    'dashboard.statistics': 'Statistics',
    'dashboard.pinnedMessages': 'Pinned Messages',
    'embedCreator.noMessagesFound': 'No messages found',
    'embedCreator.noChannelsFound': 'No channels found',
    'giveaways.channel': 'Channel',
    'giveaways.selectChannel': 'Select a channel',
    'giveaways.noChannelsFound': 'No channels found',
    'giveaways.end': 'End',
    'giveaways.delete': 'Delete',
    'giveaways.ended': 'Ended Giveaways',
    'giveaways.reroll': 'Reroll',
    'giveaways.endedAt': 'Ended At',
    'giveaways.ended': 'Giveaway ended successfully',
    'giveaways.deleted': 'Giveaway deleted successfully',
    'giveaways.rerolled': 'Giveaway rerolled successfully',
    'home.welcome': 'Welcome to {botName}',
    'home.embedCreator.title': 'Embed Creator',
    'home.embedCreator.description': 'Create rich embeds for your Discord messages with our intuitive interface. Customize colors, add fields, and preview in real-time.',
    'home.moderationTools.title': 'Moderation Tools',
    'home.moderationTools.description': 'Efficiently manage your server and users with advanced moderation features. Set up auto-mod rules, manage user roles, and keep track of infractions.',
    'home.giveawaySystem.title': 'Giveaway System',
    'home.giveawaySystem.description': 'Run engaging giveaways for your community with customizable options. Set duration, entry requirements, and let the bot handle the rest.',
    'home.login': 'Login',
    'home.dashboard': 'Go to Dashboard',
    'home.latestUpdates': 'Latest Updates',
    'home.blogPost1.title': 'New Feature: Advanced Embed Creator',
    'home.blogPost1.date': 'May 15, 2023',
    'home.blogPost1.excerpt': 'We\'ve just released our new advanced embed creator, allowing for more customization and flexibility in your Discord messages.',
    'home.blogPost2.title': 'Upcoming: Integrated Analytics',
    'home.blogPost2.date': 'May 10, 2023',
    'home.blogPost2.excerpt': 'We\'re working on bringing you integrated analytics to help you understand your server\'s activity better. Stay tuned!',
    'home.viewAllUpdates': 'View All Updates',
    'home.readMore': 'Read More',
    'blog.title': 'Blog Updates',
    'blog.post1.title': 'New Feature: Advanced Embed Creator',
    'blog.post1.date': 'May 15, 2023',
    'blog.post1.excerpt': 'We\'ve just released our new advanced embed creator, allowing for more customization and flexibility in your Discord messages.',
    'blog.post2.title': 'Upcoming: Integrated Analytics',
    'blog.post2.date': 'May 10, 2023',
    'blog.post2.excerpt': 'We\'re working on bringing you integrated analytics to help you understand your server\'s activity better. Stay tuned!',
    'blog.post3.title': 'Moderation Tools Update',
    'blog.post3.date': 'May 5, 2023',
    'blog.post3.excerpt': 'Our latest update brings new and improved moderation tools to help you manage your Discord server more effectively.',
    'blog.readMore': 'Read More',
    'nav.blog': 'Blog',
    'nav.login': 'Login',
    'dashboard.selectFunction': 'Select function',
    'dashboard.noFunctionsFound': 'No functions found',
    'cookieConsent.message': 'We use cookies to enhance your experience and analyze our traffic. Please read our Cookie Policy for more information.',
    'cookieConsent.accept': 'Accept all cookies',
    'cookieConsent.decline': 'Accept only essential cookies',
    'cookieConsent.learnMore': 'Learn more',
    'cookiePolicy.title': 'Cookie Policy',
    'cookiePolicy.description': 'This policy explains how we use cookies and similar technologies on our website.',
    'cookiePolicy.intro': 'Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.',
    'cookiePolicy.essential.name': 'Essential Cookies',
    'cookiePolicy.essential.description': 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
    'cookiePolicy.essential.duration': 'Session',
    'cookiePolicy.essential.provider': 'Wanderlust',
    'cookiePolicy.preferences.name': 'Preference Cookies',
    'cookiePolicy.preferences.description': 'These cookies allow us to remember choices you make when you use our website, such as remembering your language preferences or your login details.',
    'cookiePolicy.preferences.duration': '1 year',
    'cookiePolicy.preferences.provider': 'Wanderlust',
    'cookiePolicy.duration': 'Duration',
    'cookiePolicy.provider': 'Provider',
  },
  de: {
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Einstellungen',
    'message.content': 'Nachrichteninhalt',
    'embed.add': 'Embed hinzufügen',
    'embed.remove': 'Embed entfernen',
    'embed.title': 'Titel',
    'embed.titleUrl': 'Titel-URL',
    'embed.description': 'Beschreibung',
    'embed.color': 'Farbe',
    'embed.authorName': 'Autorenname',
    'embed.authorIconUrl': 'Autoren-Icon-URL',
    'embed.thumbnail': 'Thumbnail-URL',
    'embed.image': 'Bild-URL',
    'embed.footer': 'Fußzeile',
    'embed.footerIconUrl': 'Fußzeilen-Icon-URL',
    'embed.addField': 'Feld hinzufügen',
    'embed.fieldName': 'Feldname',
    'embed.fieldValue': 'Feldwert',
    'embed.fieldInline': 'Inline',
    'embed.preview': 'Vorschau',
    'theme.toggle': 'Thema umschalten',
    'lang.toggle': 'Sprache ändern',
    'settings.title': 'Einstellungen',
    'settings.botNickname': 'Bot-Spitzname',
    'settings.botNicknamePlaceholder': 'Bot-Spitzname eingeben',
    'settings.activityStatus': 'Aktivitätsstatus',
    'settings.selectStatus': 'Status auswählen',
    'settings.statusOnline': 'Online',
    'settings.statusIdle': 'Abwesend',
    'settings.statusDnd': 'Nicht stören',
    'settings.statusInvisible': 'Unsichtbar',
    'settings.darkMode': 'Dunkelmodus',
    'settings.language': 'Sprache',
    'settings.saveSettings': 'Einstellungen speichern',
    'settings.logout': 'Abmelden',
    'dashboard.managingServer': 'Server verwalten',
    'dashboard.embedCreator': 'Embed-Ersteller',
    'dashboard.moderation': 'Moderation',
    'dashboard.giveaways': 'Gewinnspiele',
    'dashboard.server': 'Server',
    'dashboard.selectServer': 'Server auswählen',
    'dashboard.channel': 'Kanal',
    'dashboard.selectChannel': 'Kanal auswählen',
    'dashboard.messageContent': 'Nachrichteninhalt',
    'dashboard.enterMessageContent': 'Geben Sie Ihren Nachrichteninhalt ein',
    'dashboard.embeds': 'Embeds',
    'dashboard.addEmbed': 'Embed hinzufügen',
    'dashboard.sendMessage': 'Nachricht senden',
    'moderation.title': 'Moderation',
    'moderation.action': 'Aktion',
    'moderation.selectAction': 'Aktion auswählen',
    'moderation.warn': 'Verwarnen',
    'moderation.mute': 'Stummschalten',
    'moderation.kick': 'Kicken',
    'moderation.ban': 'Bannen',
    'moderation.userId': 'Benutzer-ID',
    'moderation.enterUserId': 'Benutzer-ID eingeben',
    'moderation.reason': 'Grund',
    'moderation.enterReason': 'Grund für die Aktion eingeben',
    'moderation.takeAction': 'Aktion ausführen',
    'moderation.viewProfile': 'Profil ansehen',
    'giveaways.title': 'Gewinnspiele',
    'giveaways.prize': 'Preis',
    'giveaways.enterPrize': 'Gewinnspielpreis eingeben',
    'giveaways.winners': 'Anzahl der Gewinner',
    'giveaways.enterWinners': 'Anzahl der Gewinner eingeben',
    'giveaways.duration': 'Dauer (Stunden)',
    'giveaways.enterDuration': 'Gewinnspieldauer eingeben',
    'giveaways.createGiveaway': 'Gewinnspiel erstellen',
    'giveaways.create': 'Gewinnspiel erstellen',
    'giveaways.createDescription': 'Ein neues Gewinnspiel einrichten',
    'giveaways.endsAt': 'Endet am',
    'giveaways.description': 'Beschreibung',
    'giveaways.enterDescription': 'Gewinnspielbeschreibung eingeben',
    'giveaways.created': 'Gewinnspiel erfolgreich erstellt',
    'giveaways.active': 'Aktive Gewinnspiele',
    'giveaways.edit': 'Bearbeiten',
    'login.welcome': 'Willkommen beim Discord Bot Dashboard',
    'login.loginWithDiscord': 'Mit Discord anmelden',
    'login.loggingIn': 'Anmelden...',
    'login.failed': 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.',
    'nav.logout': 'Abmelden',
    'dashboard.clickToManage': 'Klicken Sie, um diesen Server zu verwalten',
    'dashboard.manage': 'Verwalten',
    'settings.serverSettings': 'Servereinstellungen: {server}',
    'settings.botCommanderRole': 'Bot-Kommandant-Rolle',
    'settings.selectRole': 'Wählen Sie eine Rolle',
    'settings.saved': 'Einstellungen erfolgreich gespeichert',
    'serverLogs.title': 'Server-Logs: {server}',
    'serverLogs.timestamp': 'Zeitstempel',
    'serverLogs.action': 'Aktion',
    'serverLogs.user': 'Benutzer',
    'serverLogs.details': 'Details',
    'serverLogs.filterPlaceholder': 'Logs filtern...',
    'serverLogs.filterByAction': 'Nach Aktion filtern',
    'serverLogs.allActions': 'Alle Aktionen',
    'serverLogs.commandUsed': 'Befehl verwendet',
    'serverLogs.moderation': 'Moderation',
    'serverLogs.giveaway': 'Gewinnspiel',
    'profile.title': 'Profilübersicht',
    'profile.description': 'Sehen und bearbeiten Sie Ihre Profilinformationen',
    'profile.loading': 'Profil wird geladen...',
    'profile.username': 'Benutzername',
    'profile.email': 'E-Mail',
    'profile.edit': 'Profil bearbeiten',
    'profile.save': 'Änderungen speichern',
    'profile.cancel': 'Abbrechen',
    'nav.profile': 'Profil',
    'profile.userProfile': 'Benutzerprofil',
    'profile.userProfileDescription': 'Detaillierte Informationen über den Benutzer',
    'profile.close': 'Schließen',
    'profile.joinedServer': 'Server beigetreten',
    'profile.roles': 'Rollen',
    'profile.punishmentHistory': 'Bestrafungshistorie',
    'profile.punishmentType': 'Typ',
    'profile.reason': 'Grund',
    'profile.date': 'Datum',
    'profile.moderator': 'Moderator',
    'profile.noPunishments': 'Keine Bestrafungshistorie',
    'giveaways.edited': 'Gewinnspiel erfolgreich bearbeitet',
    'giveaways.saveChanges': 'Änderungen speichern',
    'profile.discordId': 'Discord ID',
    'profile.joinedDiscord': 'Discord beigetreten',
    'moderation.userList': 'Benutzerliste',
    'moderation.selectUserDescription': 'Wähle einen Benutzer zum Moderieren aus',
    'moderation.actionDescription': 'Wähle eine Aktion aus',
    'dashboard.settings': 'Einstellungen',
    'dashboard.logs': 'Logs',
    'embedCreator.title': 'Embed-Ersteller',
    'embedCreator.selectChannel': 'Kanal auswählen',
    'embedCreator.selectChannelPlaceholder': 'Wähle einen Kanal',
    'embedCreator.messageType': 'Nachrichtentyp',
    'embedCreator.newMessage': 'Neue Nachricht',
    'embedCreator.editMessage': 'Vorhandene Nachricht bearbeiten',
    'embedCreator.selectMessage': 'Nachricht auswählen',
    'embedCreator.selectMessagePlaceholder': 'Wähle eine Nachricht zum Bearbeiten',
    'embedCreator.messageContent': 'Nachrichteninhalt',
    'embedCreator.messageContentPlaceholder': 'Gib deinen Nachrichteninhalt ein',
    'embedCreator.embeds': 'Embeds',
    'embedCreator.addEmbed': 'Embed hinzufügen',
    'embedCreator.sendMessage': 'Nachricht senden',
    'embedCreator.embed': 'Embed',
    'embedCreator.removeEmbed': 'Embed entfernen',
    'embedCreator.title': 'Titel',
    'embedCreator.description': 'Beschreibung',
    'embedCreator.color': 'Farbe',
    'embedCreator.addField': 'Feld hinzufügen',
    'embedCreator.fieldName': 'Feldname',
    'embedCreator.fieldValue': 'Feldwert',
    'embedCreator.fieldInline': 'Inline',
    'embedCreator.messageSent': 'Nachricht erfolgreich gesendet',
    'serverStatistics.title': 'Server-Statistiken',
    'serverStatistics.loading': 'Lade Server-Statistiken...',
    'serverStatistics.users': 'Benutzer',
    'serverStatistics.channels': 'Kanäle',
    'serverStatistics.roles': 'Rollen',
    'serverStatistics.emojis': 'Emojis',
    'serverStatistics.boostLevel': 'Boost-Level',
    'pinnedMessages.title': 'Angepinnte Nachrichten',
    'pinnedMessages.filterPlaceholder': 'Nachrichten filtern...',
    'pinnedMessages.filterByChannel': 'Nach Kanal filtern',
    'pinnedMessages.allChannels': 'Alle Kanäle',
    'pinnedMessages.content': 'Inhalt',
    'pinnedMessages.channel': 'Kanal',
    'pinnedMessages.author': 'Autor',
    'pinnedMessages.pinnedAt': 'Angepinnt am',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutzrichtlinie',
    'footer.tos': 'Nutzungsbedingungen',
    'footer.allRightsReserved': 'Alle Rechte vorbehalten.',
    'dashboard.statistics': 'Statistiken',
    'dashboard.pinnedMessages': 'Angepinnte Nachrichten',
    'embedCreator.noMessagesFound': 'Keine Nachrichten gefunden',
    'embedCreator.noChannelsFound': 'Keine Kanäle gefunden',
    'giveaways.channel': 'Kanal',
    'giveaways.selectChannel': 'Wähle einen Kanal',
    'giveaways.noChannelsFound': 'Keine Kanäle gefunden',
    'giveaways.end': 'Beenden',
    'giveaways.delete': 'Löschen',
    'giveaways.ended': 'Beendete Gewinnspiele',
    'giveaways.reroll': 'Neu auslosen',
    'giveaways.endedAt': 'Beendet am',
    'giveaways.ended': 'Gewinnspiel erfolgreich beendet',
    'giveaways.deleted': 'Gewinnspiel erfolgreich gelöscht',
    'giveaways.rerolled': 'Gewinnspiel erfolgreich neu ausgelost',
    'home.welcome': 'Willkommen bei {botName}',
    'home.embedCreator.title': 'Embed-Ersteller',
    'home.embedCreator.description': 'Erstellen Sie reichhaltige Embeds für Ihre Discord-Nachrichten mit unserer intuitiven Oberfläche. Passen Sie Farben an, fügen Sie Felder hinzu und sehen Sie eine Vorschau in Echtzeit.',
    'home.moderationTools.title': 'Moderationswerkzeuge',
    'home.moderationTools.description': 'Verwalten Sie Ihren Server und Benutzer effizient mit erweiterten Moderationsfunktionen. Richten Sie Auto-Mod-Regeln ein, verwalten Sie Benutzerrollen und behalten Sie Verstöße im Auge.',
    'home.giveawaySystem.title': 'Gewinnspiel-System',
    'home.giveawaySystem.description': 'Führen Sie ansprechende Gewinnspiele für Ihre Community mit anpassbaren Optionen durch. Legen Sie die Dauer und Teilnahmebedingungen fest und lassen Sie den Bot den Rest erledigen.',
    'home.login': 'Anmelden',
    'home.dashboard': 'Zum Dashboard',
    'home.latestUpdates': 'Neueste Updates',
    'home.blogPost1.title': 'Neue Funktion: Erweiterter Embed-Ersteller',
    'home.blogPost1.date': '15. Mai 2023',
    'home.blogPost1.excerpt': 'Wir haben gerade unseren neuen erweiterten Embed-Ersteller veröffentlicht, der mehr Anpassungsmöglichkeiten und Flexibilität für Ihre Discord-Nachrichten bietet.',
    'home.blogPost2.title': 'Demnächst: Integrierte Analysen',
    'home.blogPost2.date': '10. Mai 2023',
    'home.blogPost2.excerpt': 'Wir arbeiten daran, Ihnen integrierte Analysen zu bringen, um die Aktivität Ihres Servers besser zu verstehen. Bleiben Sie dran!',
    'home.viewAllUpdates': 'Alle Updates anzeigen',
    'home.readMore': 'Weiterlesen',
    'blog.title': 'Blog-Updates',
    'blog.post1.title': 'Neue Funktion: Erweiterter Embed-Ersteller',
    'blog.post1.date': '15. Mai 2023',
    'blog.post1.excerpt': 'Wir haben gerade unseren neuen erweiterten Embed-Ersteller veröffentlicht, der mehr Anpassungsmöglichkeiten und Flexibilität für Ihre Discord-Nachrichten bietet.',
    'blog.post2.title': 'Demnächst: Integrierte Analysen',
    'blog.post2.date': '10. Mai 2023',
    'blog.post2.excerpt': 'Wir arbeiten daran, Ihnen integrierte Analysen zu bringen, um die Aktivität Ihres Servers besser zu verstehen. Bleiben Sie dran!',
    'blog.post3.title': 'Update der Moderationswerkzeuge',
    'blog.post3.date': '5. Mai 2023',
    'blog.post3.excerpt': 'Unser neuestes Update bringt neue und verbesserte Moderationswerkzeuge, um Ihren Discord-Server noch effektiver verwalten zu können.',
    'blog.readMore': 'Weiterlesen',
    'nav.blog': 'Blog',
    'nav.login': 'Anmelden',
    'dashboard.selectFunction': 'Funktion auswählen',
    'dashboard.noFunctionsFound': 'Keine Funktionen gefunden',
    'cookieConsent.message': 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unseren Verkehr zu analysieren. Bitte lesen Sie unsere Cookie-Richtlinie für weitere Informationen.',
    'cookieConsent.accept': 'Alle Cookies akzeptieren',
    'cookieConsent.decline': 'Nur essentielle Cookies akzeptieren',
    'cookieConsent.learnMore': 'Mehr erfahren',
    'cookiePolicy.title': 'Cookie-Richtlinie',
    'cookiePolicy.description': 'Diese Richtlinie erklärt, wie wir Cookies und ähnliche Technologien auf unserer Website verwenden.',
    'cookiePolicy.intro': 'Unsere Website verwendet Cookies, um Sie von anderen Nutzern unserer Website zu unterscheiden. Dies hilft uns, Ihnen ein gutes Erlebnis zu bieten, wenn Sie unsere Website durchsuchen, und ermöglicht uns auch, unsere Website zu verbessern.',
    'cookiePolicy.essential.name': 'Essentielle Cookies',
    'cookiePolicy.essential.description': 'Diese Cookies sind für das Funktionieren der Website erforderlich und können in unseren Systemen nicht ausgeschaltet werden. Sie werden in der Regel nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, die einer Anforderung von Diensten entsprechen, wie z.B. das Festlegen Ihrer Datenschutzeinstellungen, das Einloggen oder das Ausfüllen von Formularen.',
    'cookiePolicy.essential.duration': 'Sitzung',
    'cookiePolicy.essential.provider': 'Wanderlust',
    'cookiePolicy.preferences.name': 'Präferenz-Cookies',
    'cookiePolicy.preferences.description': 'Diese Cookies ermöglichen es uns, Entscheidungen zu speichern, die Sie bei der Nutzung unserer Website treffen, wie z.B. Ihre Spracheinstellungen oder Ihre Anmeldedaten.',
    'cookiePolicy.preferences.duration': '1 Jahr',
    'cookiePolicy.preferences.provider': 'Wanderlust',
    'cookiePolicy.duration': 'Dauer',
    'cookiePolicy.provider': 'Anbieter',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    if (Cookies.get('cookie-preferences') === 'true') {
      const savedLanguage = Cookies.get('language') as Language
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('cookie-preferences') === 'true') {
      Cookies.set('language', language, { expires: 365 })
    }
  }, [language])

  const t = (key: string) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const useTranslation = () => {
  const { t, language } = useLanguage()
  return { t, language }
}

