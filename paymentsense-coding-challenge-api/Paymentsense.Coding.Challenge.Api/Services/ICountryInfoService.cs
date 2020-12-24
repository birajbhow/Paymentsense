using Paymentsense.Coding.Challenge.Api.ViewModels;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Services
{
    public interface ICountryInfoService
    {
        Task<CountryListViewModel> GetCountries(int page = 1);
    }
}
