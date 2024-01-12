import QRCode from 'qrcode'

const makeQr = async (link) => {
  return QRCode.toDataURL(link, { errorCorrectionLevel: 'H' })
}

export default makeQr;