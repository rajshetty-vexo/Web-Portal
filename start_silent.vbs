Set WshShell = CreateObject("WScript.Shell")
' Run batch file invisibly in the background (0 = hide window, false = do not wait)
WshShell.Run chr(34) & "run_backend.bat" & Chr(34), 0, False
Set WshShell = Nothing
