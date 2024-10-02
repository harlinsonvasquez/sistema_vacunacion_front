import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    });
    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener todos los departamentos', () => {
    const dummyDepartments = [{ id: 1, name: 'Departamento 1' }, { id: 2, name: 'Departamento 2' }];

    service.getAllDepartments().subscribe(departments => {
      expect(departments.length).toBe(2);
      expect(departments).toEqual(dummyDepartments);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDepartments);
  });

  it('debería crear un departamento', () => {
    const newDepartment = { name: 'Nuevo Departamento' };

    service.createDepartment(newDepartment).subscribe(department => {
      expect(department.name).toBe('Nuevo Departamento');
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('POST');
    request.flush({ ...newDepartment, id: 3 }); // Simula la respuesta del servidor
  });

  it('debería actualizar un departamento', () => {
    const updatedDepartment = { id: 1, name: 'Departamento Actualizado' };
    

    service.updateDepartment(updatedDepartment.id, updatedDepartment).subscribe(department => {
        expect(department.name).toBe('Departamento Actualizado');
      });

    const request = httpMock.expectOne(`${service.apiUrl}/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedDepartment); // Simula la respuesta del servidor
  });

  it('debería eliminar un departamento', () => {
    const departmentId = 1;

    service.deleteDepartment(departmentId).subscribe(response => {
      expect(response).toBeTruthy(); // Verifica que la respuesta no sea nula
    });

    const request = httpMock.expectOne(`${service.apiUrl}/${departmentId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({}); // Simula la respuesta del servidor
  });
});