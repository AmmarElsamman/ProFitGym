using System;
using QRCoder;
using API.Interfaces;
using System.Drawing;
using System.Drawing.Imaging;

namespace API.Services;

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
public class QRcodeService : IQRCodeService
{
    public byte[] GenerateQRCode(string clientId, int pixelsPerModule = 20)
    {
        string qrContent = $"CLIENT-{clientId}";

        using QRCodeGenerator qrGenerator = new();
        QRCodeData qrCodeDate = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
        using QRCode qrCode = new(qrCodeDate);
        using Bitmap qrCodeImage = qrCode.GetGraphic(pixelsPerModule);
        using MemoryStream ms = new();
        qrCodeImage.Save(ms, ImageFormat.Png);
        return ms.ToArray();

    }

    public string GenerateQRCodeBase64(string clientId, int pixelsPerModule = 20)
    {
        byte[] qrCodeBytes = GenerateQRCode(clientId, pixelsPerModule);
        return Convert.ToBase64String(qrCodeBytes);
    }
}
