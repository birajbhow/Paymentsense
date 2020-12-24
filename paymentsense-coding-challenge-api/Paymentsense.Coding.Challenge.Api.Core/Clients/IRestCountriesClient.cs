using Paymentsense.Coding.Challenge.Api.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Core.Clients
{
    public interface IRestCountriesClient
    {
        Task<List<T>> GetAll<T>() where T : Country;
    }
}
