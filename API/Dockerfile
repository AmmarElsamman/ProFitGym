FROM mcr.microsoft.com/dotnet/sdk:8.0 AS development

WORKDIR /app

# Copy project file
COPY ["API.csproj", "./"]

# Restore dependencies
RUN dotnet restore "API.csproj"

# Copy application files
COPY . .

# Expose port
EXPOSE 5000 5001

# Run with hot reload
ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000;https://0.0.0.0:5001"]