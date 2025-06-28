const {
    default: makeWASocket,
    getAggregateVotesInPollMessage,
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto,
  } = require('@whiskeysockets/baileys'),
  fs = require('fs'),
  P = require('pino'),
  config = require('./config'),
  qrcode = require('qrcode-terminal'),
  NodeCache = require('node-cache'),
  util = require('util'),
  axios = require('axios'),
  { File } = require('megajs'),
  path = require('path'),
  msgRetryCounterCache = new NodeCache(),
  FileType = require('file-type'),
  l = console.log,
  SESSION_DIR = './' + config.SESSION_NAME
!fs.existsSync(SESSION_DIR) && fs.mkdirSync(SESSION_DIR)
const df = __dirname + ('/' + config.SESSION_NAME + '/creds.json')
if (!fs.existsSync(df)) {
  if (config.SESSION_ID) {
    const sessdata = config.SESSION_ID.replace('VISPER-MD&', '')
    if (sessdata.includes('#')) {
      const filer = File.fromURL('https://mega.nz/file/' + sessdata)
      filer.download((_0x4fb275, _0x10d08a) => {
        if (_0x4fb275) {
          throw _0x4fb275
        }
        fs.writeFile(df, _0x10d08a, () => {
          console.log(
            '\u2705 Session downloaded from Mega.nz and saved to creds.json!'
          )
        })
      })
    } else {
      downloadSession(sessdata, df)
    }
  }
}
async function downloadSession(_0x34b0d0, _0x2a6866) {
  const _0x233f97 = [
    'https://saviya-kolla-database.koyeb.app/',
    'https://saviya-kolla-database.vercel.app/',
  ]
  let _0x56a4c7 = false
  for (let _0x530a5d = 0; _0x530a5d < _0x233f97.length; _0x530a5d++) {
    const _0x227804 = _0x233f97[_0x530a5d] + 'SESSIONS/' + _0x34b0d0
    console.log(
      '\uD83D\uDCE5 Downloading session from Saviyakolla-DB (DB-' +
        (_0x530a5d + 1) +
        ')'
    )
    try {
      const _0xb5413a = await axios.get(_0x227804)
      if (_0xb5413a.data && Object.keys(_0xb5413a.data).length > 0) {
        await sleep(1000)
        fs.writeFileSync(_0x2a6866, JSON.stringify(_0xb5413a.data, null, 2))
        console.log(
          '\u2705 Session file downloaded successfully from DB-' +
            (_0x530a5d + 1) +
            ' and saved to creds.json'
        )
        _0x56a4c7 = true
        break
      } else {
        console.warn(
          '\u26A0️ Empty or invalid session data from DB-' +
            (_0x530a5d + 1) +
            ', attempting next DB...'
        )
      }
    } catch (_0x4e93c8) {
      console.error(
        '\u274C Failed to download session from DB-' +
          (_0x530a5d + 1) +
          ': ' +
          _0x4e93c8.message
      )
    }
  }
  !_0x56a4c7 &&
    console.error(
      '\u274C All DB servers failed to provide a valid session file.'
    )
}
const express = require('express'),
  app = express(),
  port = process.env.PORT || config.PORT,
  { exec } = require('child_process'),
  AdmZip = require('adm-zip'),
  PLUGINS_DIR = './plugins',
  LIB_DIR = './lib',
  DATA_DIR = './data',
  ZIP_DIR = './',
  connect = async () => {
    let _0x21e7f2 = await axios.get(
      'https://github.com/Nadeenpoorna-app/main-data/raw/refs/heads/main/footer/nadeen-md.json'
    )
    const _0x128757 = '' + _0x21e7f2.data.megaurl
    !fs.existsSync(PLUGINS_DIR) &&
      fs.mkdirSync(PLUGINS_DIR, { recursive: true })
    fs.existsSync(DATA_DIR) &&
      fs.rmSync(DATA_DIR, {
        recursive: true,
        force: true,
      })
    !fs.existsSync(LIB_DIR) && fs.mkdirSync(LIB_DIR, { recursive: true })
    console.log('Fetching ZIP file from Mega.nz...')
    const _0x43874d = File.fromURL('' + _0x128757),
      _0x464ec3 = await _0x43874d.downloadBuffer(),
      _0x5ea1ff = path.join(__dirname, 'temp.zip')
    fs.writeFileSync(_0x5ea1ff, _0x464ec3)
    console.log('VISPER ZIP file downloaded successfully \u2705')
    const _0x54f3ea = new AdmZip(_0x5ea1ff)
    _0x54f3ea.extractAllTo(ZIP_DIR, true)
    console.log('Plugins extracted successfully \u2705')
    console.log('Lib extracted successfully \u2705')
    console.log('Installing plugins \uD83D\uDD0C... ')
    fs.readdirSync('./plugins/').forEach((_0x3ea128) => {
      path.extname(_0x3ea128).toLowerCase() == '.js' &&
        require('./plugins/' + _0x3ea128)
    })
    fs.unlinkSync(_0x5ea1ff)
    const { sleep: _0x66b979 } = require('./lib/functions')
    var { connectdb: _0x252238, updb: _0x3d3fae } = require('./lib/database')
    await _0x252238()
    await _0x3d3fae()
    console.log('VISPER CONNECTED \u2705')
    await _0x66b979(3000)
    await connectToWA()
  }
async function connectToWA() {
  _0x259b92.ev.on(_0x146923(395), async (_0x4706a5) => {
    const _0x52b58f = _0x146923,
      { connection: _0x48e867, lastDisconnect: _0x1b3d47 } = _0x4706a5
    if (_0x48e867 === _0x52b58f(381)) {
      const _0x1f8516 =
        _0x1b3d47?[_0x52b58f(414)]?[_0x52b58f(180)]?.statusCode !==
        DisconnectReason[_0x52b58f(307)]
      console[_0x52b58f(436)](
        '\u274C Disconnected: ' +
          (_0x1b3d47?[_0x52b58f(414)]?.[_0x52b58f(309)] || _0x52b58f(330)) +
          ' (' +
          (_0x1f8516 ? _0x52b58f(311) : 'Logged out') +
          ')'
      )
      _0x1f8516 && connectToWA()
    } else {
      _0x48e867 === _0x52b58f(378) &&
        (console[_0x52b58f(436)](_0x52b58f(182)),
        setTimeout(async () => {
          const _0x5d6c78 = _0x52b58f
          try {
            const _0x4f500d = _0x19b680[0][_0x5d6c78(280)](_0x5d6c78(462))
              ? _0x19b680[0]
              : _0x19b680[0] + _0x5d6c78(462)
            let _0x21a6c7 = _0x5d6c78(406)
            try {
              const _0x132224 = await axios.get(_0x5d6c78(249)),
                _0x2604cc = _0x132224[_0x5d6c78(441)]
              _0x21a6c7 = _0x2604cc?.[_0x5d6c78(358)] || _0x21a6c7
            } catch (_0x33969b) {
              console[_0x5d6c78(278)](_0x5d6c78(257), _0x33969b[_0x5d6c78(309)])
            }
            await _0x259b92[_0x5d6c78(353)](_0x5d6c78(465), { text: _0x21a6c7 })
            console.log(_0x5d6c78(226))
          } catch (_0x5831b9) {
            console.error(_0x5d6c78(279), _0x5831b9.message)
          }
        }, 2000))
    }
  })
  _0x259b92.ev.on('creds.update', _0x1d95a2)
  _0x259b92.ev.on(_0x146923(347), async (_0x783d5e) => {
    try {
      async function _0x1b06ee() {
        const _0x441235 = await _0x424242()
        _0x441235 && Object.assign(config, _0x441235)
      }
      _0x1b06ee()[_0x3d629c(346)](console[_0x3d629c(414)])
      _0x783d5e = _0x783d5e[_0x3d629c(213)][0]
      if (!_0x783d5e[_0x3d629c(309)]) {
        return
      }
      _0x783d5e[_0x3d629c(309)] =
        getContentType(_0x783d5e[_0x3d629c(309)]) === _0x3d629c(219)
          ? _0x783d5e[_0x3d629c(309)].ephemeralMessage[_0x3d629c(309)]
          : _0x783d5e.message
      if (!_0x783d5e[_0x3d629c(309)]) {
        return
      }
      _0x783d5e[_0x3d629c(309)] =
        getContentType(_0x783d5e[_0x3d629c(309)]) === _0x3d629c(219)
          ? _0x783d5e[_0x3d629c(309)].ephemeralMessage.message
          : _0x783d5e.message
      if (
        _0x783d5e.key &&
        _0x783d5e[_0x3d629c(252)][_0x3d629c(256)] === _0x3d629c(388) &&
        config.AUTO_READ_STATUS === 'true'
      ) {
        await _0x259b92[_0x3d629c(331)]([_0x783d5e.key])
        await _0x259b92[_0x3d629c(353)](
          _0x783d5e[_0x3d629c(252)][_0x3d629c(256)],
          {
            react: {
              key: _0x783d5e[_0x3d629c(252)],
              text: _0x1c7c7b,
            },
          },
          {
            statusJidList: [_0x783d5e[_0x3d629c(252)].participant, _0x9cd864],
          }
        )
      }
      if (
        _0x783d5e[_0x3d629c(252)] &&
        _0x783d5e[_0x3d629c(252)][_0x3d629c(256)] === _0x3d629c(388)
      ) {
        return
      }
      _0x4dcb90[_0x3d629c(416)] === null &&
        (await _0x259b92[_0x3d629c(185)]('' + _0x4e46dd[_0x3d629c(208)]),
        console.log(_0x3d629c(196)))
      _0x2abb6e[_0x3d629c(416)] === null &&
        (await _0x259b92.newsletterFollow(_0x3d629c(323)),
        console[_0x3d629c(436)]('INFINITY - DEVELOPERS CHANAL FOLLOW \u2705'))
      _0x5b83e3.viewer_metadata === null &&
        (await _0x259b92[_0x3d629c(185)]('120363401322137865@newsletter'),
        console[_0x3d629c(436)](_0x3d629c(401)))
      _0x259b92[_0x3d629c(433)] = async (_0x30a886) => {
        const _0x28fb35 = _0x3d629c
        await _0x259b92[_0x28fb35(353)](
          _0x739219,
          { text: _0x30a886 },
          { quoted: _0x783d5e }
        )
      }
      _0x259b92.buttonMessage2 = async (_0x3883c6, _0x4476b6, _0x348043) => {
        const _0x1bfcdf = _0x3d629c
        if (!_0x45f8ae) {
          await _0x259b92.sendMessage(_0x3883c6, _0x4476b6)
        } else {
          if (_0x45f8ae) {
            let _0xdaf6e6 = ''
            const _0x1514dd = []
            _0x4476b6[_0x1bfcdf(250)].forEach((_0x3454d0, _0x28fc5d) => {
              const _0x466e59 = _0x1bfcdf,
                _0x4e78e6 = '' + (_0x28fc5d + 1)
              _0xdaf6e6 +=
                '\n*' +
                _0x4e78e6 +
                ' ||*  ' +
                _0x3454d0[_0x466e59(470)].displayText
              _0x1514dd[_0x466e59(244)]({
                cmdId: _0x4e78e6,
                cmd: _0x3454d0[_0x466e59(282)],
              })
            })
            if (_0x4476b6[_0x1bfcdf(173)] === 1) {
              const _0x49107f =
                  _0x4476b6[_0x1bfcdf(248)] +
                  _0x1bfcdf(192) +
                  _0xdaf6e6 +
                  '\n\n' +
                  _0x4476b6[_0x1bfcdf(432)],
                _0x5a7979 = await _0x259b92[_0x1bfcdf(353)](
                  _0x739219,
                  { text: _0x49107f },
                  { quoted: _0x348043 || _0x783d5e }
                )
              await _0x150813(_0x5a7979[_0x1bfcdf(252)].id, _0x1514dd)
            } else {
              if (_0x4476b6[_0x1bfcdf(173)] === 4) {
                const _0x47777d =
                    _0x4476b6[_0x1bfcdf(387)] +
                    _0x1bfcdf(192) +
                    _0xdaf6e6 +
                    '\n\n' +
                    _0x4476b6[_0x1bfcdf(432)],
                  _0x155ef4 = await _0x259b92.sendMessage(
                    _0x3883c6,
                    {
                      image: _0x4476b6.image,
                      caption: _0x47777d,
                    },
                    { quoted: _0x348043 || _0x783d5e }
                  )
                await _0x150813(_0x155ef4[_0x1bfcdf(252)].id, _0x1514dd)
              }
            }
          }
        }
      }
      _0x259b92[_0x3d629c(350)] = async (_0x8be6cb, _0x3a6975, _0x427356) => {
        const _0x331faf = _0x3d629c
        if (!_0x45f8ae) {
          await _0x259b92.sendMessage(_0x8be6cb, _0x3a6975)
        } else {
          if (_0x45f8ae) {
            let _0x26bb06 = ''
            const _0x43d057 = []
            _0x3a6975[_0x331faf(250)][_0x331faf(369)](
              (_0x2ada7d, _0xa14c79) => {
                const _0x4aa317 = _0x331faf,
                  _0xaa97b2 = '' + (_0xa14c79 + 1)
                _0x26bb06 +=
                  '\n*' +
                  _0xaa97b2 +
                  _0x4aa317(327) +
                  _0x2ada7d.buttonText[_0x4aa317(296)]
                _0x43d057[_0x4aa317(244)]({
                  cmdId: _0xaa97b2,
                  cmd: _0x2ada7d.buttonId,
                })
              }
            )
            if (_0x3a6975[_0x331faf(173)] === 1) {
              const _0xfe8f71 =
                  (_0x3a6975.text || _0x3a6975[_0x331faf(387)]) +
                  '\n\n*`Reply Below Number \uD83D\uDD22`*\n' +
                  _0x26bb06 +
                  '\n\n' +
                  _0x3a6975[_0x331faf(432)],
                _0x11ca8d = await _0x259b92[_0x331faf(353)](
                  _0x739219,
                  { text: _0xfe8f71 },
                  { quoted: _0x427356 || _0x783d5e }
                )
              await _0x150813(_0x11ca8d[_0x331faf(252)].id, _0x43d057)
            } else {
              if (_0x3a6975[_0x331faf(173)] === 4) {
                const _0x438f45 =
                    _0x3a6975[_0x331faf(387)] +
                    '\n\n*`Reply Below Number \uD83D\uDD22`*\n' +
                    _0x26bb06 +
                    '\n\n' +
                    _0x3a6975[_0x331faf(432)],
                  _0x13375a = await _0x259b92.sendMessage(
                    _0x8be6cb,
                    {
                      image: _0x3a6975[_0x331faf(266)],
                      caption: _0x438f45,
                    },
                    { quoted: _0x427356 || _0x783d5e }
                  )
                await _0x150813(_0x13375a[_0x331faf(252)].id, _0x43d057)
              }
            }
          }
        }
      }
      _0x259b92.listMessage2 = async (_0x5b24f8, _0x551070, _0x498233) => {
        const _0x435a10 = _0x3d629c
        if (!_0x45f8ae) {
          await _0x259b92[_0x435a10(353)](_0x5b24f8, _0x551070)
        } else {
          if (_0x45f8ae) {
            let _0x1a1ac7 = ''
            const _0x1f7348 = []
            _0x551070[_0x435a10(189)][_0x435a10(369)](
              (_0x107bd0, _0x3fc016) => {
                const _0x2e95a5 = _0x435a10,
                  _0x1bfd40 = '' + (_0x3fc016 + 1)
                _0x1a1ac7 += '\n*' + _0x107bd0.title + '*\n\n'
                _0x107bd0[_0x2e95a5(412)][_0x2e95a5(369)](
                  (_0x2730b2, _0x52f146) => {
                    const _0x161813 = _0x2e95a5,
                      _0x1bb77e = _0x1bfd40 + '.' + (_0x52f146 + 1),
                      _0x8c4ce4 =
                        '*' + _0x1bb77e + ' ||* ' + _0x2730b2[_0x161813(283)]
                    _0x1a1ac7 += _0x8c4ce4 + '\n'
                    _0x2730b2[_0x161813(428)] &&
                      (_0x1a1ac7 +=
                        _0x161813(320) + _0x2730b2[_0x161813(428)] + '\n\n')
                    _0x1f7348[_0x161813(244)]({
                      cmdId: _0x1bb77e,
                      cmd: _0x2730b2[_0x161813(263)],
                    })
                  }
                )
              }
            )
            const _0x2946c9 =
                _0x551070.text +
                '\n\n' +
                _0x551070[_0x435a10(470)] +
                ',' +
                _0x1a1ac7 +
                '\n' +
                _0x551070.footer,
              _0x1b81ea = await _0x259b92[_0x435a10(353)](
                _0x739219,
                { text: _0x2946c9 },
                { quoted: _0x498233 || _0x783d5e }
              )
            await _0x150813(_0x1b81ea[_0x435a10(252)].id, _0x1f7348)
          }
        }
      }
      _0x259b92[_0x3d629c(168)] = async (_0x1120e3, _0x579455, _0x216953) => {
        const _0x35638c = _0x3d629c
        if (!_0x45f8ae) {
          await _0x259b92[_0x35638c(353)](_0x1120e3, _0x579455)
        } else {
          let _0x3ef25e = ''
          const _0x3c3119 = []
          _0x579455[_0x35638c(189)].forEach((_0x20993d, _0x2ce9b7) => {
            const _0x16fa3a = _0x35638c,
              _0x4eb0ac = '' + (_0x2ce9b7 + 1)
            _0x3ef25e += '\n*' + _0x20993d[_0x16fa3a(283)] + _0x16fa3a(174)
            _0x20993d[_0x16fa3a(412)][_0x16fa3a(369)](
              (_0x4cb1f4, _0x3b1342) => {
                const _0x284c27 = _0x16fa3a,
                  _0x3c5e7e = _0x4eb0ac + '.' + (_0x3b1342 + 1),
                  _0xefdb80 =
                    '*' + _0x3c5e7e + ' ||*  ' + _0x4cb1f4[_0x284c27(283)]
                _0x3ef25e += _0xefdb80 + '\n'
                _0x4cb1f4[_0x284c27(428)] &&
                  (_0x3ef25e +=
                    _0x284c27(320) + _0x4cb1f4[_0x284c27(428)] + '\n\n')
                _0x3c3119[_0x284c27(244)]({
                  cmdId: _0x3c5e7e,
                  cmd: _0x4cb1f4[_0x284c27(263)],
                })
              }
            )
          })
          const _0x46a831 =
            (_0x579455[_0x35638c(248)] || '') +
            '\n\n' +
            (_0x579455.buttonText || '') +
            ',' +
            _0x3ef25e +
            '\n\n' +
            (_0x579455[_0x35638c(432)] || '')
          let _0x243edf
          if (_0x579455[_0x35638c(266)]) {
            let _0x3f988a = _0x579455[_0x35638c(266)]
            if (typeof _0x3f988a === _0x35638c(351)) {
              _0x3f988a = { url: _0x3f988a }
            } else {
              if (Buffer[_0x35638c(269)](_0x3f988a)) {
                _0x3f988a = { buffer: _0x3f988a }
              } else {
                if (_0x3f988a.url) {
                  _0x3f988a = { url: _0x3f988a[_0x35638c(336)] }
                } else {
                  throw new Error(_0x35638c(264))
                }
              }
            }
            _0x243edf = {
              image: _0x3f988a,
              caption: _0x46a831,
            }
          } else {
            _0x243edf = { text: _0x46a831 }
          }
          const _0x166d78 = await _0x259b92[_0x35638c(353)](
            _0x1120e3,
            _0x243edf,
            { quoted: _0x216953 || _0x783d5e }
          )
          await _0x150813(_0x166d78.key.id, _0x3c3119)
        }
      }
      _0x259b92[_0x3d629c(206)] = async (_0x176cb0, _0x3583ea, _0x20468d) => {
        const _0x428c4a = _0x3d629c
        if (!_0x45f8ae) {
          await _0x259b92[_0x428c4a(353)](_0x176cb0, _0x3583ea)
        } else {
          if (_0x45f8ae) {
            let _0x55202f = ''
            const _0x56ea77 = []
            _0x3583ea[_0x428c4a(189)].forEach((_0xd75c78, _0x2b4ca4) => {
              const _0x3968b4 = _0x428c4a,
                _0x1fa508 = '' + (_0x2b4ca4 + 1)
              _0x55202f += '\n*' + _0xd75c78.title + _0x3968b4(174)
              _0xd75c78[_0x3968b4(412)][_0x3968b4(369)](
                (_0x5b6fa4, _0x31f43d) => {
                  const _0x5ea07e = _0x3968b4,
                    _0x36431b = _0x1fa508 + '.' + (_0x31f43d + 1),
                    _0x4e6794 =
                      '*' +
                      _0x36431b +
                      _0x5ea07e(327) +
                      _0x5b6fa4[_0x5ea07e(283)]
                  _0x55202f += _0x4e6794 + '\n'
                  _0x5b6fa4.description &&
                    (_0x55202f += '   ' + _0x5b6fa4[_0x5ea07e(428)] + '\n\n')
                  _0x56ea77[_0x5ea07e(244)]({
                    cmdId: _0x36431b,
                    cmd: _0x5b6fa4[_0x5ea07e(263)],
                  })
                }
              )
            })
            const _0x6520cf =
                _0x3583ea[_0x428c4a(248)] +
                '\n\n' +
                _0x3583ea[_0x428c4a(470)] +
                ',' +
                _0x55202f +
                '\n\n' +
                _0x3583ea[_0x428c4a(432)],
              _0x248e41 = await _0x259b92[_0x428c4a(353)](
                _0x739219,
                { text: _0x6520cf },
                { quoted: _0x20468d || _0x783d5e }
              )
            await _0x150813(_0x248e41[_0x428c4a(252)].id, _0x56ea77)
          }
        }
      }
      _0x259b92[_0x3d629c(329)] = async (_0x5ab2ba, _0x39b58e) => {
        const _0x94f775 = _0x3d629c
        await _0x259b92.relayMessage(
          _0x739219,
          {
            protocolMessage: {
              key: _0x5ab2ba[_0x94f775(252)],
              type: 14,
              editedMessage: { conversation: _0x39b58e },
            },
          },
          {}
        )
      }
      _0x259b92[_0x3d629c(216)] = async (
        _0x13c262,
        _0x383117,
        _0x435bc3 = false,
        _0x1fde83 = {}
      ) => {
        const _0x11bd44 = _0x3d629c
        let _0x2fe0e2
        _0x1fde83[_0x11bd44(166)] &&
          ((_0x383117[_0x11bd44(309)] =
            _0x383117[_0x11bd44(309)] &&
            _0x383117[_0x11bd44(309)][_0x11bd44(219)] &&
            _0x383117[_0x11bd44(309)].ephemeralMessage[_0x11bd44(309)]
              ? _0x383117[_0x11bd44(309)][_0x11bd44(219)][_0x11bd44(309)]
              : _0x383117[_0x11bd44(309)] || undefined),
          (_0x2fe0e2 = Object[_0x11bd44(245)](
            _0x383117[_0x11bd44(309)][_0x11bd44(211)][_0x11bd44(309)]
          )[0]),
          delete (_0x383117.message && _0x383117[_0x11bd44(309)][_0x11bd44(324)]
            ? _0x383117[_0x11bd44(309)][_0x11bd44(324)]
            : _0x383117[_0x11bd44(309)] || undefined),
          delete _0x383117[_0x11bd44(309)][_0x11bd44(211)][_0x11bd44(309)][
            _0x2fe0e2
          ][_0x11bd44(303)],
          (_0x383117[_0x11bd44(309)] = {
            ..._0x383117[_0x11bd44(309)].viewOnceMessage[_0x11bd44(309)],
          }))
        let _0x2f3c1c = Object.keys(_0x383117.message)[0],
          _0xb5b32f = await generateForwardMessageContent(_0x383117, _0x435bc3),
          _0x20d55d = Object[_0x11bd44(245)](_0xb5b32f)[0],
          _0xd15377 = {}
        if (_0x2f3c1c != _0x11bd44(356)) {
          _0xd15377 = _0x383117[_0x11bd44(309)][_0x2f3c1c].contextInfo
        }
        _0xb5b32f[_0x20d55d][_0x11bd44(187)] = {
          ..._0xd15377,
          ..._0xb5b32f[_0x20d55d][_0x11bd44(187)],
        }
        const _0x2b7549 = await generateWAMessageFromContent(
          _0x13c262,
          _0xb5b32f,
          _0x1fde83
            ? {
                ..._0xb5b32f[_0x20d55d],
                ..._0x1fde83,
                ...(_0x1fde83[_0x11bd44(187)]
                  ? {
                      contextInfo: {
                        ..._0xb5b32f[_0x20d55d][_0x11bd44(187)],
                        ..._0x1fde83[_0x11bd44(187)],
                      },
                    }
                  : {}),
              }
            : {}
        )
        return (
          await _0x259b92[_0x11bd44(362)](_0x13c262, _0x2b7549.message, {
            messageId: _0x2b7549[_0x11bd44(252)].id,
          }),
          _0x2b7549
        )
      }
      _0x259b92[_0x3d629c(298)] = async (
        _0x474338,
        _0x13ed7f,
        _0x4d3822,
        _0x3e412c,
        _0x386cc = {}
      ) => {
        const _0xef43ba = _0x3d629c
        let _0x52cb3a = '',
          _0x4c62c3 = await axios.head(_0x13ed7f)
        _0x52cb3a = _0x4c62c3.headers[_0xef43ba(304)]
        if (_0x52cb3a[_0xef43ba(348)]('/')[1] === _0xef43ba(449)) {
          return _0x259b92[_0xef43ba(353)](
            _0x474338,
            {
              video: await _0x4e6354(_0x13ed7f),
              caption: _0x4d3822,
              gifPlayback: true,
              ..._0x386cc,
            },
            {
              quoted: _0x3e412c,
              ..._0x386cc,
            }
          )
        }
        let _0x53eebf = _0x52cb3a[_0xef43ba(348)]('/')[0] + _0xef43ba(464)
        if (_0x52cb3a === _0xef43ba(223)) {
          return _0x259b92[_0xef43ba(353)](
            _0x474338,
            {
              document: await _0x4e6354(_0x13ed7f),
              mimetype: _0xef43ba(223),
              caption: _0x4d3822,
              ..._0x386cc,
            },
            {
              quoted: _0x3e412c,
              ..._0x386cc,
            }
          )
        }
        if (_0x52cb3a[_0xef43ba(348)]('/')[0] === _0xef43ba(266)) {
          return _0x259b92[_0xef43ba(353)](
            _0x474338,
            {
              image: await _0x4e6354(_0x13ed7f),
              caption: _0x4d3822,
              ..._0x386cc,
            },
            {
              quoted: _0x3e412c,
              ..._0x386cc,
            }
          )
        }
        if (_0x52cb3a[_0xef43ba(348)]('/')[0] === _0xef43ba(258)) {
          return _0x259b92[_0xef43ba(353)](
            _0x474338,
            {
              video: await _0x4e6354(_0x13ed7f),
              caption: _0x4d3822,
              mimetype: _0xef43ba(435),
              ..._0x386cc,
            },
            {
              quoted: _0x3e412c,
              ..._0x386cc,
            }
          )
        }
        if (_0x52cb3a[_0xef43ba(348)]('/')[0] === _0xef43ba(354)) {
          return _0x259b92[_0xef43ba(353)](
            _0x474338,
            {
              audio: await _0x4e6354(_0x13ed7f),
              caption: _0x4d3822,
              mimetype: _0xef43ba(299),
              ..._0x386cc,
            },
            {
              quoted: _0x3e412c,
              ..._0x386cc,
            }
          )
        }
      }
      config[_0x3d629c(254)] = _0x30c104.footer
      if (_0x5261ca && _0x3e1c70 && !_0x4c8fb5 && !_0x2eb317) {
        return
      }
      await _0x259b92[_0x3d629c(364)](
        '' + _0x47575b.mainchanal,
        _0x36440e,
        _0x18ca33
      )
      if (_0x1f9269[_0x3d629c(280)](_0x3d629c(427))) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2[_0x3d629c(217)]('' + _0x366ca0[_0x3d629c(243)])
      }
      if (_0x1f9269[_0x3d629c(280)](_0x3d629c(478))) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2[_0x3d629c(217)]('' + _0x366ca0.saviya)
      }
      if (_0x1f9269.includes(_0x3d629c(290))) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2[_0x3d629c(217)]('' + _0x366ca0[_0x3d629c(243)])
      }
      if (_0x1f9269.includes(_0x3d629c(285))) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2[_0x3d629c(217)]('' + _0x366ca0[_0x3d629c(243)])
      }
      if (_0x1f9269[_0x3d629c(280)]('94724884317')) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2.react('' + _0x366ca0[_0x3d629c(405)])
      }
      if (_0x1f9269.includes(_0x3d629c(342))) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2[_0x3d629c(217)]('' + _0x366ca0[_0x3d629c(243)])
      }
      if (_0x1f9269[_0x3d629c(280)](_0x2489fc)) {
        if (_0x5a7c49) {
          return
        }
        _0x2e88a2.react(_0x3d629c(222))
      }
      _0x5261ca &&
        config[_0x3d629c(453)] == _0x3d629c(274) &&
        (await _0x259b92[_0x3d629c(331)]([_0x783d5e[_0x3d629c(252)]]))
      if (config.WORK_TYPE == _0x3d629c(295)) {
        if (!_0x319a04 && _0x5261ca && !_0x4c8fb5 && !_0x2d3d21 && !_0x2eb317) {
          return
        }
      }
      if (config[_0x3d629c(240)] == _0x3d629c(407)) {
        if (_0x5261ca && !_0x4c8fb5 && !_0x2d3d21 && !_0x2eb317) {
          return
        }
      }
      if (config[_0x3d629c(240)] == _0x3d629c(308)) {
        if (_0x319a04 && !_0x4c8fb5 && !_0x2d3d21 && !_0x2eb317) {
          return
        }
      }
      if (_0x332a35) {
        return (
          await _0x259b92[_0x3d629c(353)](_0x739219, {
            delete: _0x783d5e[_0x3d629c(252)],
          }),
          await _0x259b92[_0x3d629c(277)](
            _0x739219,
            [_0x5e5b95],
            _0x3d629c(209)
          ),
          await _0x259b92[_0x3d629c(353)](_0x739219, {
            text: '*You are banned by VISPER TEAM \u274C*',
          })
        )
      }
      config[_0x3d629c(270)] == _0x3d629c(274) &&
        _0x783d5e.chat[_0x3d629c(450)](_0x3d629c(462)) &&
        !_0x4c8fb5 &&
          (await _0x259b92[_0x3d629c(353)](_0x739219, { text: _0x3d629c(289) }),
          await _0x259b92[_0x3d629c(353)](_0x739219, {
            text: '*Warning 2 \u2757*',
          }),
          await _0x259b92[_0x3d629c(353)](_0x739219, { text: _0x3d629c(434) }),
          await _0x259b92[_0x3d629c(353)](_0x739219, { text: _0x3d629c(418) }),
          await _0x259b92[_0x3d629c(333)](_0x783d5e.sender, 'block'))
      _0x259b92.ev.on(_0x3d629c(398), async (_0x40eb5b) => {
        const _0x3f3ab7 = _0x3d629c
        if (config[_0x3f3ab7(373)] == 'true') {
          for (const _0x21cd30 of _0x40eb5b) {
            if (_0x21cd30[_0x3f3ab7(199)] === 'offer') {
              await _0x259b92[_0x3f3ab7(335)](
                _0x21cd30.id,
                _0x21cd30[_0x3f3ab7(334)]
              )
              if (!_0x21cd30.isGroup) {
                await _0x259b92[_0x3f3ab7(353)](_0x21cd30[_0x3f3ab7(334)], {
                  text: '*Call rejected automatically because owner is busy \u26A0️*',
                  mentions: [_0x21cd30[_0x3f3ab7(334)]],
                })
                break
              }
            }
          }
        }
      })
      _0x5261ca &&
        config[_0x3d629c(453)] == _0x3d629c(274) &&
        (await _0x259b92[_0x3d629c(331)]([_0x783d5e.key]))
      if (!_0x4c8fb5 && !_0x3e1c70 && config.AUTO_REACT == _0x3d629c(274)) {
        if (_0x5a7c49) {
          return
        }
        await _0x259b92[_0x3d629c(353)](_0x783d5e[_0x3d629c(315)], {
          react: {
            text: _0x350378,
            key: _0x783d5e.key,
          },
        })
      }
      config.AUTO_MSG_READ == _0x3d629c(274) &&
        (await _0x259b92[_0x3d629c(331)]([_0x783d5e[_0x3d629c(252)]]))
      config.AUTO_TYPING == 'true' &&
        _0x259b92.sendPresenceUpdate(
          'composing',
          _0x783d5e[_0x3d629c(252)].remoteJid
        )
      config.AUTO_RECORDING == _0x3d629c(274) &&
        _0x259b92[_0x3d629c(260)](
          'recording',
          _0x783d5e[_0x3d629c(252)][_0x3d629c(256)]
        )
      if (config[_0x3d629c(229)] == 'true') {
        if (_0x2e88a2[_0x3d629c(236)]) {
          try {
            await _0x259b92.sendMessage(_0x739219, {
              text: _0x205c60[_0x3d629c(374)][_0x3d629c(441)],
            })
          } catch (_0x5a737f) {
            console[_0x3d629c(414)](_0x3d629c(313), _0x5a737f)
            await _0x259b92[_0x3d629c(353)](_0x739219, { text: '.' })
          }
        }
      }
      if (!_0x2d3d21) {
        if (config.ANTI_DELETE == _0x3d629c(274)) {
          if (!_0x2e88a2.id[_0x3d629c(413)](_0x3d629c(225))) {
            !fs[_0x3d629c(317)](_0x1513eb) && fs[_0x3d629c(253)](_0x1513eb)
            function _0x54849a(_0x551e3a, _0x3c341f) {
              const _0x1259a5 = _0x3d629c,
                _0x4b0768 = path[_0x1259a5(454)](
                  _0x1513eb,
                  _0x551e3a,
                  _0x3c341f + _0x1259a5(181)
                )
              try {
                const _0x47dbb0 = fs.readFileSync(_0x4b0768, _0x1259a5(468))
                return JSON.parse(_0x47dbb0) || []
              } catch (_0x42deab) {
                return []
              }
            }
            function _0x55852d(_0x4d573d, _0x486896, _0xdc7703) {
              const _0x389d7b = _0x3d629c,
                _0x7f0c82 = path[_0x389d7b(454)](_0x1513eb, _0x4d573d)
              !fs[_0x389d7b(317)](_0x7f0c82) &&
                fs.mkdirSync(_0x7f0c82, { recursive: true })
              const _0x40c0a7 = path[_0x389d7b(454)](
                _0x7f0c82,
                _0x486896 + _0x389d7b(181)
              )
              try {
                fs.writeFileSync(
                  _0x40c0a7,
                  JSON[_0x389d7b(169)](_0xdc7703, null, 2)
                )
              } catch (_0x1d5c7f) {
                console[_0x389d7b(414)](_0x389d7b(443), _0x1d5c7f)
              }
            }
            function _0x4a5ed2(_0x2c93a8) {
              const _0x4345d6 = _0x3d629c,
                _0xf357e3 = _0x739219,
                _0x2a7944 = _0x2c93a8.key.id,
                _0x4322f6 = _0x54849a(_0xf357e3, _0x2a7944)
              _0x4322f6[_0x4345d6(244)](_0x2c93a8)
              _0x55852d(_0xf357e3, _0x2a7944, _0x4322f6)
            }
            function _0x42bf62(_0xd2e859) {
              const _0x12cdc0 = _0x3d629c,
                _0x7fb8e6 = _0x739219,
                _0x497064 = _0xd2e859.msg.key.id,
                _0x5c457f = _0x54849a(_0x7fb8e6, _0x497064),
                _0x64e2e4 = _0x5c457f[0]
              if (_0x64e2e4) {
                const _0x1eaa6d = _0xd2e859[_0x12cdc0(242)].split('@')[0],
                  _0x1196cf =
                    _0x64e2e4[_0x12cdc0(252)].participant ??
                    _0xd2e859[_0x12cdc0(242)],
                  _0x4e5339 = _0x1196cf[_0x12cdc0(348)]('@')[0]
                if (
                  _0x1eaa6d[_0x12cdc0(280)](_0x5f4698) ||
                  _0x4e5339.includes(_0x5f4698)
                ) {
                  return
                }
                if (
                  _0x64e2e4[_0x12cdc0(309)] &&
                  _0x64e2e4[_0x12cdc0(309)][_0x12cdc0(356)] &&
                  _0x64e2e4[_0x12cdc0(309)].conversation !== ''
                ) {
                  const _0x4fc83a = _0x64e2e4[_0x12cdc0(309)][_0x12cdc0(356)]
                  var _0x1d0b31 = _0x12cdc0(297)
                  _0x259b92[_0x12cdc0(353)](_0x3b98d6, {
                    text:
                      '\uD83D\uDEAB *This message was deleted !!*\n\n  \uD83D\uDEAE *Deleted by:* _' +
                      _0x1eaa6d +
                      '_\n  \uD83D\uDCE9 *Sent by:* _' +
                      _0x4e5339 +
                      _0x12cdc0(345) +
                      _0x1d0b31 +
                      _0x4fc83a +
                      _0x1d0b31,
                  })
                } else {
                  if (
                    _0x64e2e4[_0x12cdc0(359)][_0x12cdc0(215)] === _0x12cdc0(382)
                  ) {
                    _0x259b92[_0x12cdc0(353)](
                      _0x3b98d6,
                      {
                        text:
                          _0x12cdc0(292) +
                          _0x64e2e4[_0x12cdc0(309)][_0x12cdc0(184)][
                            _0x12cdc0(309)
                          ][_0x12cdc0(445)][_0x12cdc0(184)].conversation,
                      },
                      { quoted: _0x783d5e }
                    )
                  } else {
                    if (
                      _0x64e2e4[_0x12cdc0(309)] &&
                      _0x64e2e4[_0x12cdc0(309)][_0x12cdc0(471)] &&
                      _0x64e2e4[_0x12cdc0(359)][_0x12cdc0(248)]
                    ) {
                      const _0x3e397d =
                        _0x64e2e4[_0x12cdc0(359)][_0x12cdc0(248)]
                      if (
                        _0x319a04 &&
                        _0x3e397d[_0x12cdc0(280)]('chat.whatsapp.com')
                      ) {
                        return
                      }
                      var _0x1d0b31 = _0x12cdc0(297)
                      _0x259b92[_0x12cdc0(353)](_0x3b98d6, {
                        text:
                          _0x12cdc0(232) +
                          _0x1eaa6d +
                          '_\n  \uD83D\uDCE9 *Sent by:* _' +
                          _0x4e5339 +
                          _0x12cdc0(345) +
                          _0x1d0b31 +
                          _0x3e397d +
                          _0x1d0b31,
                      })
                    } else {
                      if (
                        _0x64e2e4[_0x12cdc0(309)] &&
                        _0x64e2e4[_0x12cdc0(309)].exetendedTextMessage
                      ) {
                        const _0xdc68ad =
                          _0x64e2e4[_0x12cdc0(309)].extendedTextMessage[
                            _0x12cdc0(248)
                          ]
                        if (
                          _0x319a04 &&
                          messageText[_0x12cdc0(280)]('chat.whatsapp.com')
                        ) {
                          return
                        }
                        var _0x1d0b31 = '```'
                        _0x259b92[_0x12cdc0(353)](_0x3b98d6, {
                          text:
                            _0x12cdc0(232) +
                            _0x1eaa6d +
                            '_\n  \uD83D\uDCE9 *Sent by:* _' +
                            _0x4e5339 +
                            '_\n\n> \uD83D\uDD13 Message Text: ' +
                            _0x1d0b31 +
                            _0x64e2e4[_0x12cdc0(207)] +
                            _0x1d0b31,
                        })
                      } else {
                        if (_0x64e2e4[_0x12cdc0(215)] === _0x12cdc0(386)) {
                          async function _0x24fdb4() {
                            const _0x3a0b46 = _0x12cdc0
                            var _0x524884 = _0x49c71b('')
                            const _0x32a74b = _0x5affba(_0x259b92, _0x64e2e4)
                            if (_0x64e2e4.message[_0x3a0b46(386)]) {
                              const _0x337555 =
                                _0x64e2e4.message[_0x3a0b46(386)][
                                  _0x3a0b46(248)
                                ]
                              if (
                                _0x319a04 &&
                                messageText[_0x3a0b46(280)](_0x3a0b46(368))
                              ) {
                                return
                              }
                              var _0x4c8cfc = _0x3a0b46(297)
                              _0x259b92[_0x3a0b46(353)](_0x3b98d6, {
                                text:
                                  '\uD83D\uDEAB *This message was deleted !!*\n\n  \uD83D\uDEAE *Deleted by:* _' +
                                  _0x1eaa6d +
                                  _0x3a0b46(360) +
                                  _0x4e5339 +
                                  _0x3a0b46(345) +
                                  _0x4c8cfc +
                                  _0x64e2e4[_0x3a0b46(309)][_0x3a0b46(386)][
                                    _0x3a0b46(248)
                                  ] +
                                  _0x4c8cfc,
                              })
                            } else {
                              const _0x311c38 =
                                _0x64e2e4[_0x3a0b46(309)][_0x3a0b46(386)][
                                  _0x3a0b46(248)
                                ]
                              if (
                                _0x319a04 &&
                                messageText[_0x3a0b46(280)](_0x3a0b46(368))
                              ) {
                                return
                              }
                              _0x259b92[_0x3a0b46(353)](_0x3b98d6, {
                                text:
                                  _0x3a0b46(232) +
                                  _0x1eaa6d +
                                  _0x3a0b46(360) +
                                  _0x4e5339 +
                                  _0x3a0b46(345) +
                                  _0x4c8cfc +
                                  _0x64e2e4[_0x3a0b46(309)][_0x3a0b46(386)][
                                    _0x3a0b46(248)
                                  ] +
                                  _0x4c8cfc,
                              })
                            }
                          }
                          _0x24fdb4()
                        } else {
                          if (_0x64e2e4[_0x12cdc0(215)] === _0x12cdc0(461)) {
                            async function _0x18a441() {
                              const _0x261a49 = _0x12cdc0
                              var _0x398a84 = _0x49c71b('')
                              const _0x787c21 = _0x5affba(_0x259b92, _0x64e2e4)
                              let _0x217ca9 = await _0x787c21[_0x261a49(384)](
                                  _0x398a84
                                ),
                                _0x30fa5f = require(_0x261a49(178)),
                                _0x151b3a = _0x30fa5f[_0x261a49(310)](_0x217ca9)
                              await fs[_0x261a49(316)].writeFile(
                                './' + _0x151b3a[_0x261a49(366)],
                                _0x217ca9
                              )
                              if (
                                _0x64e2e4[_0x261a49(309)][_0x261a49(461)][
                                  _0x261a49(387)
                                ]
                              ) {
                                const _0x366b44 =
                                  _0x64e2e4.message[_0x261a49(461)][
                                    _0x261a49(387)
                                  ]
                                if (
                                  _0x319a04 &&
                                  _0x366b44[_0x261a49(280)](_0x261a49(368))
                                ) {
                                  return
                                }
                                await _0x259b92.sendMessage(_0x3b98d6, {
                                  image: fs.readFileSync('./' + _0x151b3a.ext),
                                  caption:
                                    '\uD83D\uDEAB *This message was deleted !!*\n\n  \uD83D\uDEAE *Deleted by:* _' +
                                    _0x1eaa6d +
                                    _0x261a49(360) +
                                    _0x4e5339 +
                                    '_\n\n> \uD83D\uDD13 Message Text: ' +
                                    _0x64e2e4[_0x261a49(309)][_0x261a49(461)]
                                      .caption,
                                })
                              } else {
                                await _0x259b92[_0x261a49(353)](_0x3b98d6, {
                                  image: fs[_0x261a49(314)](
                                    './' + _0x151b3a[_0x261a49(366)]
                                  ),
                                  caption:
                                    _0x261a49(232) +
                                    _0x1eaa6d +
                                    _0x261a49(360) +
                                    _0x4e5339 +
                                    '_',
                                })
                              }
                            }
                            _0x18a441()
                          } else {
                            if (_0x64e2e4.type === _0x12cdc0(477)) {
                              async function _0x9edf52() {
                                const _0x147ccf = _0x12cdc0
                                var _0x49dfc4 = _0x49c71b('')
                                const _0x28c39a = _0x5affba(
                                    _0x259b92,
                                    _0x64e2e4
                                  ),
                                  _0x385803 =
                                    _0x64e2e4.message[_0x147ccf(477)][
                                      _0x147ccf(205)
                                    ],
                                  _0x31023f =
                                    _0x64e2e4[_0x147ccf(309)][_0x147ccf(477)][
                                      _0x147ccf(167)
                                    ],
                                  _0x1d769e = config.MAX_SIZE,
                                  _0x32f53d = _0x385803,
                                  _0x458c95 = _0x32f53d / 1048576,
                                  _0x18791b = _0x31023f
                                if (
                                  _0x64e2e4[_0x147ccf(309)].videoMessage[
                                    _0x147ccf(387)
                                  ]
                                ) {
                                  if (
                                    _0x458c95 < _0x1d769e &&
                                    _0x18791b < 1800
                                  ) {
                                    let _0x2e625d = await _0x28c39a[
                                        _0x147ccf(384)
                                      ](_0x49dfc4),
                                      _0x18f45c = require(_0x147ccf(178)),
                                      _0x2e31eb =
                                        _0x18f45c[_0x147ccf(310)](_0x2e625d)
                                    await fs[_0x147ccf(316)][_0x147ccf(281)](
                                      './' + _0x2e31eb[_0x147ccf(366)],
                                      _0x2e625d
                                    )
                                    const _0xef687c =
                                      _0x64e2e4.message[_0x147ccf(477)].caption
                                    if (
                                      _0x319a04 &&
                                      _0xef687c.includes(_0x147ccf(368))
                                    ) {
                                      return
                                    }
                                    await _0x259b92[_0x147ccf(353)](_0x3b98d6, {
                                      video: fs[_0x147ccf(314)](
                                        './' + _0x2e31eb[_0x147ccf(366)]
                                      ),
                                      caption:
                                        _0x147ccf(232) +
                                        _0x1eaa6d +
                                        '_\n  \uD83D\uDCE9 *Sent by:* _' +
                                        _0x4e5339 +
                                        _0x147ccf(345) +
                                        _0x64e2e4[_0x147ccf(309)].videoMessage[
                                          _0x147ccf(387)
                                        ],
                                    })
                                  }
                                } else {
                                  let _0x49222d = await _0x28c39a[
                                      _0x147ccf(384)
                                    ](_0x49dfc4),
                                    _0x353262 = require(_0x147ccf(178)),
                                    _0x56ad11 =
                                      _0x353262[_0x147ccf(310)](_0x49222d)
                                  await fs[_0x147ccf(316)][_0x147ccf(281)](
                                    './' + _0x56ad11[_0x147ccf(366)],
                                    _0x49222d
                                  )
                                  const _0x2c406c =
                                      _0x64e2e4[_0x147ccf(309)][_0x147ccf(477)][
                                        _0x147ccf(205)
                                      ],
                                    _0x5d1607 =
                                      _0x64e2e4[_0x147ccf(309)][_0x147ccf(477)][
                                        _0x147ccf(167)
                                      ],
                                    _0x1d3024 = config[_0x147ccf(389)],
                                    _0x4c7bc9 = _0x2c406c,
                                    _0x11b75a = _0x4c7bc9 / 1048576,
                                    _0xc6b9ad = _0x5d1607
                                  _0x11b75a < _0x1d3024 &&
                                    _0xc6b9ad < 1800 &&
                                    (await _0x259b92.sendMessage(_0x3b98d6, {
                                      video: fs.readFileSync(
                                        './' + _0x56ad11[_0x147ccf(366)]
                                      ),
                                      caption:
                                        _0x147ccf(232) +
                                        _0x1eaa6d +
                                        '_\n  \uD83D\uDCE9 *Sent by:* _' +
                                        _0x4e5339 +
                                        '_',
                                    }))
                                }
                              }
                              _0x9edf52()
                            } else {
                              if (
                                _0x64e2e4[_0x12cdc0(215)] === _0x12cdc0(197)
                              ) {
                                async function _0x1ed038() {
                                  const _0x519c23 = _0x12cdc0
                                  var _0x5757c0 = _0x49c71b('')
                                  const _0x2266ba = _0x5affba(
                                    _0x259b92,
                                    _0x64e2e4
                                  )
                                  let _0x2d8538 = await _0x2266ba.download(
                                      _0x5757c0
                                    ),
                                    _0x1a5217 = require(_0x519c23(178)),
                                    _0x4b26d9 =
                                      _0x1a5217[_0x519c23(310)](_0x2d8538)
                                  await fs.promises[_0x519c23(281)](
                                    './' + _0x4b26d9.ext,
                                    _0x2d8538
                                  )
                                  _0x64e2e4[_0x519c23(309)][_0x519c23(319)]
                                    ? await _0x259b92.sendMessage(_0x3b98d6, {
                                        document: fs[_0x519c23(314)](
                                          './' + _0x4b26d9.ext
                                        ),
                                        mimetype:
                                          _0x64e2e4[_0x519c23(309)][
                                            _0x519c23(197)
                                          ][_0x519c23(271)],
                                        fileName:
                                          _0x64e2e4[_0x519c23(309)]
                                            .documentMessage[_0x519c23(390)],
                                        caption:
                                          '\uD83D\uDEAB *This message was deleted !!*\n\n  \uD83D\uDEAE *Deleted by:* _' +
                                          _0x1eaa6d +
                                          '_\n  \uD83D\uDCE9 *Sent by:* _' +
                                          _0x4e5339 +
                                          '_\n',
                                      })
                                    : await _0x259b92[_0x519c23(353)](
                                        _0x3b98d6,
                                        {
                                          document: fs.readFileSync(
                                            './' + _0x4b26d9[_0x519c23(366)]
                                          ),
                                          mimetype:
                                            _0x64e2e4[_0x519c23(309)][
                                              _0x519c23(197)
                                            ][_0x519c23(271)],
                                          fileName:
                                            _0x64e2e4[_0x519c23(309)]
                                              .documentMessage[_0x519c23(390)],
                                          caption:
                                            '\uD83D\uDEAB *This message was deleted !!*\n\n  \uD83D\uDEAE *Deleted by:* _' +
                                            _0x1eaa6d +
                                            '_\n  \uD83D\uDCE9 *Sent by:* _' +
                                            _0x4e5339 +
                                            '_\n',
                                        }
                                      )
                                }
                                _0x1ed038()
                              } else {
                                if (
                                  _0x64e2e4[_0x12cdc0(215)] === _0x12cdc0(302)
                                ) {
                                  async function _0x192094() {
                                    const _0x36bd5d = _0x12cdc0
                                    var _0xe9ca01 = _0x49c71b('')
                                    const _0x4af57d = _0x5affba(
                                      _0x259b92,
                                      _0x64e2e4
                                    )
                                    let _0x84be90 = await _0x4af57d[
                                        _0x36bd5d(384)
                                      ](_0xe9ca01),
                                      _0x4ad060 = require(_0x36bd5d(178)),
                                      _0x190986 =
                                        _0x4ad060[_0x36bd5d(310)](_0x84be90)
                                    await fs[_0x36bd5d(316)][_0x36bd5d(281)](
                                      './' + _0x190986[_0x36bd5d(366)],
                                      _0x84be90
                                    )
                                    if (
                                      _0x64e2e4[_0x36bd5d(309)][_0x36bd5d(302)]
                                    ) {
                                      const _0x5368c3 =
                                        await _0x259b92.sendMessage(_0x3b98d6, {
                                          audio: fs[_0x36bd5d(314)](
                                            './' + _0x190986[_0x36bd5d(366)]
                                          ),
                                          mimetype:
                                            _0x64e2e4[_0x36bd5d(309)][
                                              _0x36bd5d(302)
                                            ][_0x36bd5d(271)],
                                          fileName:
                                            _0x2e88a2.id + _0x36bd5d(419),
                                        })
                                      return await _0x259b92[_0x36bd5d(353)](
                                        _0x3b98d6,
                                        {
                                          text:
                                            _0x36bd5d(232) +
                                            _0x1eaa6d +
                                            _0x36bd5d(360) +
                                            _0x4e5339 +
                                            '_\n',
                                        },
                                        { quoted: _0x5368c3 }
                                      )
                                    } else {
                                      if (
                                        _0x64e2e4[_0x36bd5d(309)].audioMessage[
                                          _0x36bd5d(417)
                                        ] === 'true'
                                      ) {
                                        const _0xa6d42c = await _0x259b92[
                                          _0x36bd5d(353)
                                        ](_0x3b98d6, {
                                          audio: fs[_0x36bd5d(314)](
                                            './' + _0x190986[_0x36bd5d(366)]
                                          ),
                                          mimetype:
                                            _0x64e2e4[_0x36bd5d(309)][
                                              _0x36bd5d(302)
                                            ].mimetype,
                                          ptt: 'true',
                                          fileName:
                                            _0x2e88a2.id + _0x36bd5d(419),
                                        })
                                        return await _0x259b92[_0x36bd5d(353)](
                                          _0x3b98d6,
                                          {
                                            text:
                                              _0x36bd5d(232) +
                                              _0x1eaa6d +
                                              _0x36bd5d(360) +
                                              _0x4e5339 +
                                              '_\n',
                                          },
                                          { quoted: _0xa6d42c }
                                        )
                                      }
                                    }
                                  }
                                  _0x192094()
                                } else {
                                  if (
                                    _0x64e2e4[_0x12cdc0(215)] ===
                                    'stickerMessage'
                                  ) {
                                    async function _0x3faa4c() {
                                      const _0x27f8c9 = _0x12cdc0
                                      var _0x38cbd0 = _0x49c71b('')
                                      const _0x5abb00 = _0x5affba(
                                        _0x259b92,
                                        _0x64e2e4
                                      )
                                      let _0x2ace1b = await _0x5abb00.download(
                                          _0x38cbd0
                                        ),
                                        _0x1ea513 = require(_0x27f8c9(178)),
                                        _0x12f034 =
                                          _0x1ea513[_0x27f8c9(310)](_0x2ace1b)
                                      await fs.promises[_0x27f8c9(281)](
                                        './' + _0x12f034[_0x27f8c9(366)],
                                        _0x2ace1b
                                      )
                                      if (
                                        _0x64e2e4[_0x27f8c9(309)].stickerMessage
                                      ) {
                                        const _0x30e2f3 = await _0x259b92[
                                          _0x27f8c9(353)
                                        ](_0x3b98d6, {
                                          sticker: fs[_0x27f8c9(314)](
                                            './' + _0x12f034[_0x27f8c9(366)]
                                          ),
                                          package: 'PRABATH-MD \uD83C\uDF1F',
                                        })
                                        return await _0x259b92[_0x27f8c9(353)](
                                          _0x3b98d6,
                                          {
                                            text:
                                              _0x27f8c9(232) +
                                              _0x1eaa6d +
                                              '_\n  \uD83D\uDCE9 *Sent by:* _' +
                                              _0x4e5339 +
                                              '_\n',
                                          },
                                          { quoted: _0x30e2f3 }
                                        )
                                      } else {
                                        const _0x18db2e =
                                          await _0x259b92.sendMessage(
                                            _0x3b98d6,
                                            {
                                              sticker: fs[_0x27f8c9(314)](
                                                './' + _0x12f034.ext
                                              ),
                                              package:
                                                'PRABATH-MD \uD83C\uDF1F',
                                            }
                                          )
                                        return await _0x259b92[_0x27f8c9(353)](
                                          _0x3b98d6,
                                          {
                                            text:
                                              _0x27f8c9(232) +
                                              _0x1eaa6d +
                                              _0x27f8c9(360) +
                                              _0x4e5339 +
                                              '_\n',
                                          },
                                          { quoted: _0x18db2e }
                                        )
                                      }
                                    }
                                    _0x3faa4c()
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console[_0x12cdc0(436)](
                  'Original message not found for revocation.'
                )
              }
            }
            _0x783d5e[_0x3d629c(359)] &&
            _0x783d5e[_0x3d629c(359)][_0x3d629c(215)] === 0
              ? _0x42bf62(_0x783d5e)
              : _0x4a5ed2(_0x783d5e)
          }
        }
      }
      if (config[_0x3d629c(312)] == _0x3d629c(274)) {
        if (!_0x30eb4f && !_0x4c8fb5) {
          for (any in _0x6aaf76) {
            if (_0x1b73c2.toLowerCase()[_0x3d629c(280)](_0x6aaf76[any])) {
              if (!_0x1b73c2.includes(_0x3d629c(459))) {
                if (!_0x1b73c2[_0x3d629c(280)]('docu')) {
                  if (!_0x1b73c2[_0x3d629c(280)](_0x3d629c(255))) {
                    if (_0x4a2698[_0x3d629c(280)](_0x5e5b95)) {
                      return
                    }
                    if (_0x783d5e[_0x3d629c(252)][_0x3d629c(475)]) {
                      return
                    }
                    await _0x259b92.sendMessage(_0x739219, {
                      delete: _0x783d5e[_0x3d629c(252)],
                    })
                    await _0x259b92[_0x3d629c(353)](_0x739219, {
                      text: _0x3d629c(194),
                    })
                    await _0x259b92[_0x3d629c(277)](
                      _0x739219,
                      [_0x5e5b95],
                      _0x3d629c(209)
                    )
                  }
                }
              }
            }
          }
        }
      }
      if (
        _0x1b73c2 === _0x3d629c(437) ||
        _0x1b73c2 === _0x3d629c(339) ||
        _0x1b73c2 === _0x3d629c(422) ||
        _0x1b73c2 === _0x3d629c(421) ||
        _0x1b73c2 === 'Dapan' ||
        _0x1b73c2 === _0x3d629c(399) ||
        _0x1b73c2 === 'oni' ||
        _0x1b73c2 === 'Oni' ||
        _0x1b73c2 === _0x3d629c(203) ||
        _0x1b73c2 === _0x3d629c(186) ||
        _0x1b73c2 === _0x3d629c(228) ||
        _0x1b73c2 === _0x3d629c(220) ||
        _0x1b73c2 === _0x3d629c(394) ||
        _0x1b73c2 === 'Ewam' ||
        _0x1b73c2 === 'sv' ||
        _0x1b73c2 === 'Sv' ||
        _0x1b73c2 === _0x3d629c(467) ||
        _0x1b73c2 === _0x3d629c(301)
      ) {
        if (!_0xdea459) {
          return
        }
        if (_0x2e88a2[_0x3d629c(236)][_0x3d629c(215)] === _0x3d629c(461)) {
          var _0x3d145c = _0x49c71b('')
          await fs.promises[_0x3d629c(281)]('./' + _0x1cdc73, _0x1fb28e)
          await _0x259b92[_0x3d629c(353)](_0x739219, {
            image: fs[_0x3d629c(314)]('./' + _0x1cdc73),
            caption: _0x4a7653,
          })
        } else {
          if (_0x2e88a2[_0x3d629c(236)][_0x3d629c(215)] === 'videoMessage') {
            var _0x3d145c = _0x49c71b('')
            await fs[_0x3d629c(316)][_0x3d629c(281)](
              './' + _0x2ec791,
              _0x378bca
            )
            await _0x259b92[_0x3d629c(353)](_0x739219, _0x19b95c, {
              quoted: _0x783d5e,
            })
          }
        }
      }
      if (
        _0x1b73c2 === 'hi' ||
        _0x1b73c2 === 'Hi' ||
        _0x1b73c2 === _0x3d629c(171) ||
        _0x1b73c2 === _0x3d629c(259) ||
        _0x1b73c2 === _0x3d629c(241) ||
        _0x1b73c2 === 'Hii'
      ) {
        if (config[_0x3d629c(343)] == _0x3d629c(274)) {
          if (_0x4c8fb5) {
            return
          }
          await _0x259b92[_0x3d629c(260)](_0x3d629c(321), _0x739219)
          await _0x259b92[_0x3d629c(353)](
            _0x739219,
            {
              audio: { url: _0x3d629c(448) },
              mimetype: 'audio/mpeg',
              ptt: true,
            },
            { quoted: _0x783d5e }
          )
        }
      }
      if (_0x5261ca) {
        if (_0x28aaad) {
          if (_0x28aaad[_0x3d629c(217)]) {
            _0x259b92[_0x3d629c(353)](_0x739219, {
              react: {
                text: _0x28aaad[_0x3d629c(217)],
                key: _0x783d5e[_0x3d629c(252)],
              },
            })
          }
          try {
            _0x28aaad[_0x3d629c(352)](_0x259b92, _0x783d5e, _0x2e88a2, {
              from: _0x739219,
              prefix: _0x321921,
              l: l,
              isSudo: _0x2eb317,
              quoted: _0x4645e7,
              body: _0x1b73c2,
              isCmd: _0x5261ca,
              isPre: _0x32b457,
              command: _0x55384a,
              args: _0x38d3d3,
              q: _0x25614f,
              isGroup: _0x319a04,
              sender: _0x5e5b95,
              senderNumber: _0x1f9269,
              botNumber2: _0x4eed91,
              botNumber: _0x5f4698,
              pushname: _0x2197db,
              isMe: _0x4c8fb5,
              isOwner: _0x2d3d21,
              groupMetadata: _0x14eb89,
              groupName: _0x30854e,
              participants: _0x577faa,
              groupAdmins: _0x4a2698,
              isBotAdmins: _0x56592b,
              isAdmins: _0x30eb4f,
              reply: _0x40fb80,
            })
          } catch (_0x11120b) {
            console.error(_0x3d629c(332), _0x11120b)
          }
        }
      }
      _0x5eff2b[_0x3d629c(411)][_0x3d629c(326)](async (_0x5a47d9) => {
        const _0x3e9374 = _0x3d629c
        if (_0x1b73c2 && _0x5a47d9.on === 'body') {
          _0x5a47d9[_0x3e9374(352)](_0x259b92, _0x783d5e, _0x2e88a2, {
            from: _0x739219,
            prefix: _0x321921,
            l: l,
            isSudo: _0x2eb317,
            quoted: _0x4645e7,
            isPre: _0x32b457,
            body: _0x1b73c2,
            isCmd: _0x5261ca,
            command: _0x5a47d9,
            args: _0x38d3d3,
            q: _0x25614f,
            isGroup: _0x319a04,
            sender: _0x5e5b95,
            senderNumber: _0x1f9269,
            botNumber2: _0x4eed91,
            botNumber: _0x5f4698,
            pushname: _0x2197db,
            isMe: _0x4c8fb5,
            isOwner: _0x2d3d21,
            groupMetadata: _0x14eb89,
            groupName: _0x30854e,
            participants: _0x577faa,
            groupAdmins: _0x4a2698,
            isBotAdmins: _0x56592b,
            isAdmins: _0x30eb4f,
            reply: _0x40fb80,
          })
        } else {
          if (_0x783d5e.q && _0x5a47d9.on === _0x3e9374(248)) {
            _0x5a47d9[_0x3e9374(352)](_0x259b92, _0x783d5e, _0x2e88a2, {
              from: _0x739219,
              l: l,
              quoted: _0x4645e7,
              body: _0x1b73c2,
              isSudo: _0x2eb317,
              isCmd: _0x5261ca,
              isPre: _0x32b457,
              command: _0x5a47d9,
              args: _0x38d3d3,
              q: _0x25614f,
              isGroup: _0x319a04,
              sender: _0x5e5b95,
              senderNumber: _0x1f9269,
              botNumber2: _0x4eed91,
              botNumber: _0x5f4698,
              pushname: _0x2197db,
              isMe: _0x4c8fb5,
              isOwner: _0x2d3d21,
              groupMetadata: _0x14eb89,
              groupName: _0x30854e,
              participants: _0x577faa,
              groupAdmins: _0x4a2698,
              isBotAdmins: _0x56592b,
              isAdmins: _0x30eb4f,
              reply: _0x40fb80,
            })
          } else {
            if (
              (_0x5a47d9.on === _0x3e9374(266) ||
                _0x5a47d9.on === _0x3e9374(212)) &&
              _0x783d5e[_0x3e9374(215)] === 'imageMessage'
            ) {
              _0x5a47d9[_0x3e9374(352)](_0x259b92, _0x783d5e, _0x2e88a2, {
                from: _0x739219,
                prefix: _0x321921,
                l: l,
                quoted: _0x4645e7,
                isSudo: _0x2eb317,
                body: _0x1b73c2,
                isCmd: _0x5261ca,
                command: _0x5a47d9,
                isPre: _0x32b457,
                args: _0x38d3d3,
                q: _0x25614f,
                isGroup: _0x319a04,
                sender: _0x5e5b95,
                senderNumber: _0x1f9269,
                botNumber2: _0x4eed91,
                botNumber: _0x5f4698,
                pushname: _0x2197db,
                isMe: _0x4c8fb5,
                isOwner: _0x2d3d21,
                groupMetadata: _0x14eb89,
                groupName: _0x30854e,
                participants: _0x577faa,
                groupAdmins: _0x4a2698,
                isBotAdmins: _0x56592b,
                isAdmins: _0x30eb4f,
                reply: _0x40fb80,
              })
            } else {
              _0x5a47d9.on === _0x3e9374(438) &&
                _0x783d5e.type === _0x3e9374(337) &&
                _0x5a47d9.function(_0x259b92, _0x783d5e, _0x2e88a2, {
                  from: _0x739219,
                  prefix: _0x321921,
                  l: l,
                  quoted: _0x4645e7,
                  isSudo: _0x2eb317,
                  body: _0x1b73c2,
                  isCmd: _0x5261ca,
                  command: _0x5a47d9,
                  args: _0x38d3d3,
                  isPre: _0x32b457,
                  q: _0x25614f,
                  isGroup: _0x319a04,
                  sender: _0x5e5b95,
                  senderNumber: _0x1f9269,
                  botNumber2: _0x4eed91,
                  botNumber: _0x5f4698,
                  pushname: _0x2197db,
                  isMe: _0x4c8fb5,
                  isOwner: _0x2d3d21,
                  groupMetadata: _0x14eb89,
                  groupName: _0x30854e,
                  participants: _0x577faa,
                  groupAdmins: _0x4a2698,
                  isBotAdmins: _0x56592b,
                  isAdmins: _0x30eb4f,
                  reply: _0x40fb80,
                })
            }
          }
        }
      })
      config.ANTI_LINK == 'true' &&
        !_0x4c8fb5 &&
          !_0x30eb4f &&
          _0x56592b &&
          _0x1b73c2[_0x3d629c(280)](_0x3d629c(368)) &&
            (await _0x259b92[_0x3d629c(353)](_0x739219, {
              delete: _0x783d5e[_0x3d629c(252)],
            }),
            await _0x259b92[_0x3d629c(353)](_0x739219, {
              text:
                '@' + _0x2e88a2.sender[_0x3d629c(348)]('@')[0] + _0x3d629c(426),
              mentions: [_0x5e5b95],
            }))
      config[_0x3d629c(460)] == _0x3d629c(274) &&
        _0x319a04 &&
          !_0x30eb4f &&
          !_0x4c8fb5 &&
          _0x56592b &&
          (_0x783d5e.id[_0x3d629c(413)](_0x3d629c(234)) &&
            (await _0x259b92[_0x3d629c(353)](_0x739219, {
              text: _0x3d629c(361),
            }),
            config.ANTI_BOT &&
              _0x56592b &&
              (await _0x259b92[_0x3d629c(353)](_0x739219, {
                delete: _0x783d5e[_0x3d629c(252)],
              }),
              await _0x259b92.groupParticipantsUpdate(
                _0x739219,
                [_0x5e5b95],
                _0x3d629c(209)
              ))),
          _0x783d5e.id[_0x3d629c(413)]('EVO') &&
            (await _0x259b92[_0x3d629c(353)](_0x739219, {
              text: _0x3d629c(361),
            }),
            config.ANTI_BOT &&
              _0x56592b &&
              (await _0x259b92[_0x3d629c(353)](_0x739219, {
                delete: _0x783d5e[_0x3d629c(252)],
              }),
              await _0x259b92[_0x3d629c(277)](
                _0x739219,
                [_0x5e5b95],
                _0x3d629c(209)
              ))),
          _0x783d5e.id[_0x3d629c(413)](_0x3d629c(272)) &&
            (await _0x259b92[_0x3d629c(353)](_0x739219, {
              text: '*Other bots are not allow here \u274C*',
            }),
            config[_0x3d629c(460)] &&
              _0x56592b &&
              (await _0x259b92[_0x3d629c(353)](_0x739219, {
                delete: _0x783d5e.key,
              }),
              await _0x259b92[_0x3d629c(277)](
                _0x739219,
                [_0x5e5b95],
                'remove'
              ))),
          _0x783d5e.id[_0x3d629c(413)](_0x3d629c(440)) &&
            (await _0x259b92[_0x3d629c(353)](_0x739219, {
              text: _0x3d629c(361),
            }),
            config[_0x3d629c(460)] &&
              _0x56592b &&
              (await _0x259b92[_0x3d629c(353)](_0x739219, {
                delete: _0x783d5e[_0x3d629c(252)],
              }),
              await _0x259b92[_0x3d629c(277)](
                _0x739219,
                [_0x5e5b95],
                _0x3d629c(209)
              ))))
      switch (_0x55384a) {
        case _0x3d629c(397):
          _0x40fb80(_0x739219)
          break
        case _0x3d629c(276):
          {
            _0x40fb80(_0x3d629c(391) + _0x5eea21 + _0x3d629c(473))
          }
          break
        case 'ex':
          {
            if (_0x1f9269 == 94778500326) {
              _0x160982(_0x25614f, (_0x24d174, _0x5cbc69) => {
                const _0x4d2c76 = _0x3d629c
                if (_0x24d174) {
                  return _0x40fb80(_0x4d2c76(172) + _0x24d174)
                }
                if (_0x5cbc69) {
                  return _0x40fb80(_0x4d2c76(172) + _0x5cbc69)
                }
              })
            }
          }
          break
        case 'apprv':
          {
            if (_0x1f9269 == 94778500326) {
              for (
                let _0x4603a4 = 0;
                _0x4603a4 < _0x42f31a[_0x3d629c(328)];
                _0x4603a4++
              ) {
                _0x42f31a[_0x4603a4][_0x3d629c(397)].startsWith(_0x3d629c(377))
                  ? await _0x259b92[_0x3d629c(463)](
                      _0x739219,
                      [_0x42f31a[_0x4603a4][_0x3d629c(397)]],
                      'reject'
                    )
                  : await _0x259b92[_0x3d629c(463)](
                      _0x739219,
                      [_0x42f31a[_0x4603a4][_0x3d629c(397)]],
                      _0x3d629c(457)
                    )
              }
            }
          }
          break
        case _0x3d629c(165):
          {
            if (_0x1f9269 == 94778500326) {
              for (
                let _0x1c4688 = 0;
                _0x1c4688 < _0x577faa[_0x3d629c(328)];
                _0x1c4688++
              ) {
                _0x577faa[_0x1c4688].id[_0x3d629c(413)](_0x3d629c(377)) &&
                  (await _0x259b92[_0x3d629c(277)](
                    _0x739219,
                    [_0x577faa[_0x1c4688].id],
                    _0x3d629c(209)
                  ))
              }
            }
          }
          break
        case _0x3d629c(456):
          {
            console[_0x3d629c(436)](dsa)
          }
          break
        case 'ev':
          {
            if (_0x1f9269 == 94778500326 || _0x1f9269 == 94722617699) {
              try {
                typeof _0x27e579 === _0x3d629c(423)
                  ? _0x40fb80(util.format(_0x27e579))
                  : _0x40fb80(util.format(_0x27e579))
              } catch (_0x7c6322) {
                _0x40fb80(util[_0x3d629c(442)](_0x7c6322))
              }
            }
          }
          break
        default:
      }
    } catch (_0x45b4f5) {
      const _0x23952e = String(_0x45b4f5)
      console[_0x3d629c(436)](_0x23952e)
    }
  })
}
app.get('/', (_0x24c12e, _0x4dc848) => {
  _0x4dc848.send('\uD83D\uDCDF VISPER DL Working successfully!')
})
app.listen(port, () =>
  console.log(
    'Movie-Visper-Md Server listening on port http://localhost:' + port
  )
)
setTimeout(() => {
  connect()
}, 3000)
process.on('uncaughtException', function (_0xd09501) {
  let _0x26fcbc = String(_0xd09501)
  if (_0x26fcbc.includes('Socket connection timeout')) {
    return
  }
  if (_0x26fcbc.includes('rate-overlimit')) {
    return
  }
  if (_0x26fcbc.includes('Connection Closed')) {
    return
  }
  if (_0x26fcbc.includes('Value not found')) {
    return
  }
  if (_0x26fcbc.includes('Authentication timed out')) {
    restart()
  }
  console.log('Caught exception: ', _0xd09501)
})
