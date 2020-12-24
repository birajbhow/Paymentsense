using Microsoft.AspNetCore.Mvc;
using Paymentsense.Coding.Challenge.Api.Core.Models;
using Paymentsense.Coding.Challenge.Api.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsenseCodingChallengeController : ControllerBase
    {
        private readonly ICountryInfoService _countryInfoService;
        
        public PaymentsenseCodingChallengeController(ICountryInfoService countryInfoService)
        {
            _countryInfoService = countryInfoService;
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Paymentsense Coding Challenge!");
        }

        [HttpGet("countries")]
        public async Task<ActionResult<List<Country>>> GetAllCountries(int page = 1)
        {
            var result = await this._countryInfoService.GetCountries(page);
            return Ok(result);
        }
    }
}
