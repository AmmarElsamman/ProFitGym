using API.Interfaces;
using QRCoder;
namespace API.Services;

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
public class QRcodeService : IQRCodeService
{
    public byte[] GenerateQRCode(string clientId, int pixelsPerModule = 20)
    {
        string qrContent = $"CLIENT-{clientId}";

        using QRCodeGenerator qrGenerator = new();
        QRCodeData qrCodeDate = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
        PngByteQRCode qrCode = new(qrCodeDate);
        return qrCode.GetGraphic(pixelsPerModule);


    }

    public string GenerateQRCodeBase64(string clientId, int pixelsPerModule = 20)
    {
        byte[] qrCodeBytes = GenerateQRCode(clientId, pixelsPerModule);
        return Convert.ToBase64String(qrCodeBytes);
    }
}
