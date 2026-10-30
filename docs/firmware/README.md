# Firmware patches

`no-wakeups.patch` is a change for the lamp firmware repo
([fionnf/linked_friend_lights](https://github.com/fionnf/linked_friend_lights)),
made and tested there but not pushed (the session that wrote it had read-only
access). It makes the lamps drop every alarm that is not a bedtime fade, so a
wake-up cannot fire no matter what is stored on the lamps or the broker.

Apply it (in a clone of linked_friend_lights, on `master`):

```
git am /path/to/Affections-gatcha/docs/firmware/no-wakeups.patch
python3 tests/test_firmware.py && python3 tests/test_ota.py && python3 tests/test_rollback.py
git push origin master
```

The lamps download `master` on every boot and at 13:00 Zurich time. To update
them right away, press **↺ Reboot Both Boards** on the lights page. The boards
check the download compiles and keep the old firmware if it doesn't.
