package com.ontheblock.www.instrument.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ontheblock.www.instrument.domain.Instrument;

import java.util.List;

@Repository
public interface InstrumentRepository extends JpaRepository<Instrument, Long> {
    @Query("SELECT i FROM Instrument i WHERE i.instrumentName LIKE %:keyword% ORDER BY CASE WHEN i.instrumentName LIKE :keyword% THEN 0 ELSE 1 END, i.instrumentName")
    List<Instrument> findByKeyword(@Param("keyword") String keyword);
}
