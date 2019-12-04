using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using CourierAPI.Core;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Helpers;
using CourierAPI.Infrastructure.Data;
using CourierAPI.Infrastructure.Repositories;


namespace CourierAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            //Configure Database
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("CourierDB")
                )
            );

            //Configure Identity and Identity Store
            services.AddIdentity<AppUser, IdentityRole>()
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<DataContext>();

            services.AddMvc();

            services.AddControllers().AddNewtonsoftJson(
                 options => options.SerializerSettings.ReferenceLoopHandling =            
                Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddCors();
            
            // Automapper Configuration
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            // configure DI for application services
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IMerchantRepository, MerchantRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IItemAttributeRepository, ItemAttributeRepository>();
            services.AddScoped<IReceiverRepository, ReceiverRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IBookingItemRepository, BookingItemRepository>();
            services.AddScoped<IDeliveryAddressRepository, DeliveryAddressRepository>();
            services.AddScoped<IDeliveryManRepository, DeliveryManRepository>();
            

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            
          
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
