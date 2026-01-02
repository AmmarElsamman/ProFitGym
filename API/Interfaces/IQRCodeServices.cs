using System;

namespace API.Interfaces;

public interface IQRCodeService
{
    byte[] GenerateQRCode(string clientId, int pixelsPerModule = 20);
    string GenerateQRCodeBase64(string clientId, int pixelsPerModule = 20);
}
